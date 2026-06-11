import urllib.request, json, sys, time
sys.stdout.reconfigure(encoding='utf-8')

URL = 'http://localhost:7788'

def ctl(obj, timeout=90):
    req = urllib.request.Request(URL, data=json.dumps(obj).encode(),
                                 headers={'Content-Type': 'application/json'})
    return json.loads(urllib.request.urlopen(req, timeout=timeout).read().decode())

def goto(u):
    return ctl({'action': 'goto', 'url': u})

def ev(code):
    return ctl({'action': 'eval', 'code': code})

def wait(ms):
    return ctl({'action': 'wait', 'ms': ms}, timeout=ms/1000 + 20)

def shot(p):
    return ctl({'action': 'screenshot', 'path': p})

def url():
    return ctl({'action': 'url'})
