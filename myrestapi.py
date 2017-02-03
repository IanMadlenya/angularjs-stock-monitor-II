import json
import bottle
from bottle import route, run, request, abort
from bson.json_util import dumps
from bottle import static_file
import traceback

@route('/<filename:path>')
def server_static(filename):
    return static_file(filename, root='public')

run(host='localhost', port=3300)
