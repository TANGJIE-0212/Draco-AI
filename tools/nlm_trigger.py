import json, sys, time
sys.stdout.reconfigure(encoding='utf-8')
from nlm_ctl import goto, ev, ctl, wait, shot

def click_id(sel):
    return ctl({'action': 'click', 'selector': sel})

def trigger(url, steer, tag):
    goto(url); wait(5000)
    # open Customize dialog via chevron
    r = ev("""(() => {
      const cont=[...document.querySelectorAll('[role=button],div')].find(e=>e.getAttribute('aria-label')==='Video Overview' && (e.className||'').toString().includes('create-artifact-button-container'));
      if(!cont) return 'no-cont';
      const chev=[...cont.querySelectorAll('button,[role=button],mat-icon,span')].find(e=>(e.textContent||'').includes('chevron'));
      if(chev){(chev.closest('button')||chev).id='vo-chev'; return 'chev';}
      cont.id='vo-chev'; return 'cont';
    })()""")
    print(tag, 'open:', r['result'])
    click_id('#vo-chev'); wait(3000)
    # language -> 中文（简体）
    ev("(() => { const s=document.querySelector('mat-select'); if(s){s.id='lang-sel'; const t=s.querySelector('.mat-mdc-select-trigger')||s; t.id='lang-trig';} return 'ok'; })()")
    click_id('#lang-trig'); wait(2500)
    ev("(() => { const o=[...document.querySelectorAll('mat-option')].find(x=>(x.textContent||'').trim()==='中文（简体）'); if(o){o.scrollIntoView({block:'center'}); o.id='zh-opt';} return o?'ok':'no'; })()")
    wait(800); click_id('#zh-opt'); wait(2000)
    lang = ev("document.querySelector('mat-select')?document.querySelector('mat-select').textContent.trim():'na'")['result']
    print(tag, 'lang:', lang)
    # whiteboard
    ev("""(() => { const c=[...document.querySelectorAll('div,button,[role=button]')].filter(e=>(e.textContent||'').trim()==='Whiteboard'&&e.children.length<=2); if(c.length){c[0].scrollIntoView({block:'center'}); c[0].id='wb-style';} return c.length?'ok':'no'; })()""")
    wait(500); click_id('#wb-style'); wait(1200)
    # steering
    code = """
    (() => {
      const ta=[...document.querySelectorAll('textarea')].find(t=>{const a=(t.getAttribute('aria-label')||'')+(t.getAttribute('placeholder')||'');return a.includes('focus')||a.includes('host');}) || [...document.querySelectorAll('textarea')].pop();
      if(!ta) return 'no-ta';
      const setter=Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set;
      setter.call(ta, %s); ta.dispatchEvent(new Event('input',{bubbles:true})); ta.dispatchEvent(new Event('change',{bubbles:true}));
      return ta.value.slice(0,20);
    })()
    """ % json.dumps(steer, ensure_ascii=False)
    print(tag, 'steer:', ev(code)['result'])
    wait(1000)
    # generate
    ev("(() => { const b=[...document.querySelectorAll('button')].find(x=>(x.textContent||'').trim()==='Generate'); if(b)b.id='gen-btn'; return b?'ok':'no'; })()")
    click_id('#gen-btn'); wait(6000)
    txt = ev('document.body.innerText')['result']
    gen = ('Generating' in txt) or ('may take a while' in txt)
    shot('vo-' + tag + '-after.png')
    print(tag, 'GENERATING=' + str(gen))
    return gen
