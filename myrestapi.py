import json
import bottle
from bottle import route, run, request, abort
from bson.json_util import dumps
from bottle import static_file
import traceback
from pymongo import MongoClient
connection = MongoClient('localhost', 27017)
db = connection.stocks

@route('/<filename:path>')
def server_static(filename):
    return static_file(filename, root='public')

def exec_buy(buy_stock):
    stock = db['stocksColln'].find_one({"scripCode" : buy_stock['scripCode']})
    #if the person has the stock already, calculate average purchase price and increment the quantity
    if stock:
        new_quantity = stock['quantity'] + buy_stock['quantity']
        new_value = stock['quantity'] * stock['purchasePrice']  + buy_stock['quantity'] * buy_stock['marketPrice']
        new_purchase_price = int(new_value /new_quantity)
        stock['quantity'] = new_quantity
        stock['purchasePrice'] = new_purchase_price
        db['stocksColln'].save(stock)
        print "adding count to the existing purchase..."
        return json.dumps({"status" : "success" })
    #if the user is purchasing the stock for the first time, add a new record
    else:
        print "this is the first purchase, so adding a new record for the purchase"
        db['stocksColln'].insert({
            "quantity" : buy_stock['quantity'],
            "scripCode" : buy_stock['scripCode'],
            "scripName" : buy_stock['scripName'],
            "purchasePrice" : buy_stock['marketPrice']
        })
        return json.dumps({"status" : "success" })

@route('/api/buy', method='POST')
def buy_stock():
    data = request.body.readline()
    if not data:
        abort(400, 'No data received')
    buy_stock = json.loads(data)
    try:
        stats = db['statsInfo'].find_one()
        #Check if the user has sufficient cash balance..
        if stats['cash'] < buy_stock['marketPrice'] * buy_stock['quantity']:
            body_text = json.dumps({"status" : "error", "message" : "You don't have sufficient cash to buy stocks" })
            return bottle.HTTPResponse(status=400, body=body_text)
        #if he has, then deduct the purchase amount from his cash balance and increment the stock quantity..
        else:
            stats['cash'] = int(stats['cash'] - buy_stock['marketPrice'] * buy_stock['quantity'])
            db['statsInfo'].save(stats)
            return exec_buy(buy_stock)
    except Exception as ve:
        print traceback.format_exc()
        abort(400, str(ve))

def exec_sell(stock, sell_stock):
    if stock['quantity'] >= sell_stock['quantity']:
        stats = db['statsInfo'].find_one()
        stats['cash'] = int(stats['cash'] + sell_stock['quantity'] * sell_stock['marketPrice'])
        db['statsInfo'].save(stats)
        new_quantity = stock['quantity'] - sell_stock['quantity']
        if new_quantity > 0:
            print "updating the quantity with new value....."
            stock['quantity'] = new_quantity
            db['stocksColln'].save(stock);
            return json.dumps({ "status" : "success" })
        else:
            print "deleting the entire row record since all stocks are sold..."
            db.stocksColln.delete_one( {"_id" : stock["_id"]})
            return json.dumps({"status" : "success" })
    else:
        body_text = json.dumps({"status" : "error", "message" : "you have insufficient quantity to sell"})
        return bottle.HTTPResponse(status=400, body=body_text)
    
@route('/api/sell', method='POST')
def sell_stock():
    data = request.body.readline()
    if not data:
        abort(400, 'No data received')
    print data
    sell_stock = json.loads(data)
    try:
        stock = db['stocksColln'].find_one({"scripCode" : sell_stock['scripCode']})
        print "Before selling, the stock in the account is, ", stock
        if stock:
            return exec_sell(stock, sell_stock)
        else:
            body_text = json.dumps({"status" : "error", "message" : "you have zero quantity to sell"})
            return bottle.HTTPResponse(status=400, body=body_text)
    except Exception as ve:
        print traceback.format_exc()
        abort(400, str(ve))
        
@route('/api/cash', method='GET')
def get_cash_balance():
    cash_entity = db['statsInfo'].find_one()
    print "Cash balance is ", json.dumps({ "cash" : cash_entity["cash"]}, indent=2)
    return json.dumps({ "cash" : cash_entity["cash"]})

@route('/api/stocks')
def get_all_stocks():
    my_entities = []
    entities = db['stocksColln'].find()
    #return dumps(entities)
    for entity in entities:
        my_entities.append({
            "quantity" : entity['quantity'],
            "scripCode" : entity['scripCode'],
            "scripName" : entity['scripName'],
            "purchasePrice" : entity['purchasePrice']
        })
    print "Stocks in account are, ", json.dumps(my_entities, indent=2)
    if not entities:
        abort(404, 'No document with id %s' % id)
    return json.dumps(my_entities)    

run(host='localhost', port=3300)
