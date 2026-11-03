from PIL import Image
from pathlib import Path
import requests, io

root=Path(__file__).resolve().parents[1]
out=root/'public/images'
out.mkdir(parents=True,exist_ok=True)
pair=Image.open(root/'assets/design/button-pair-raw.png')
for name,x in [('up',0),('down',724)]:
    part=pair.crop((x,250,x+724,990))
    part=part.resize((520,532))
    if name=='down':
        aligned=Image.new('RGBA',part.size)
        aligned.paste(part,(18,0))
        part=aligned
    part.save(out/f'button-{name}.webp',quality=82)
for p in (root/'assets/captures').glob('*.png'):
    im=Image.open(p)
    im.thumbnail((1400,1100))
    im.save(out/(p.stem+'.webp'),quality=78)
im=Image.open(root/'assets/captures/01-poteto-cartoon-large-view.png')
im.crop((22,45,1715,1075)).resize((1400,852)).save(out/'cartoon.webp',quality=72)
im=Image.open(root/'assets/design/reset-card.png')
im.crop((190,150,1345,860)).resize((800,492)).save(out/'reset-card.webp',quality=83)
avatars=root/'public/avatars'
avatars.mkdir(exist_ok=True)
for handle in ['thsottiaux','poteto']:
    try:
        r=requests.get('https://unavatar.io/x/'+handle,timeout=20)
        r.raise_for_status()
        Image.open(io.BytesIO(r.content)).convert('RGB').resize((96,96)).save(avatars/(handle+'.webp'))
    except Exception:
        # Public avatar crops from the supplied receipts; no generated likenesses.
        im=Image.open(root/('assets/captures/02-kickoff.png' if handle=='thsottiaux' else 'assets/captures/01-poteto-cartoon.png'))
        im.crop((15,12,55,52)).resize((96,96)).save(avatars/(handle+'.webp'))
print('Optimized images prepared')
