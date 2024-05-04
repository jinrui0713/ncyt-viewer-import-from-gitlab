document.addEventListener('DOMContentLoaded', function () {
  const iframe = document.getElementsByTagName('iframe')[0];
  const seachResults = document.getElementById('search-results');
  seachResults.addEventListener('click', (e) => {
    e.preventDefault();
    const a = e.target.closest('a.gs-title');
    if (!a) {
      return;
    }
    const verifiedHref = checkGoogleInsert(a.href);
    if (/youtube/.test(verifiedHref)) {
      const url = new URL(verifiedHref);
      const params = url.searchParams;
      const id = params.get('v');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&modestbranding=1`
    } else if (/nicovideo/.test(verifiedHref)) {
      const cutstart = verifiedHref.lastIndexOf('/') + 1;
      let cutend;
      if (verifiedHref.indexOf('?') != -1){
        cutend = verifiedHref.indexOf('?');
      } else {
        cutend = verifiedHref.length;
      }
      const id = verifiedHref.slice(cutstart, cutend);
      iframe.src = `https://embed.nicovideo.jp/watch/${id}?jsapi=1`;
      window.addEventListener('message', (event) => {
        if (event.origin === 'https://embed.nicovideo.jp') {
          if (!(/iPhone|iPad|iPod|Android/.test(navigator.userAgent)) && event.data['eventName'] == 'loadComplete') {
            iframe.contentWindow.postMessage({
              sourceConnectorType: 1,
              eventName: 'play'
            }, 'https://embed.nicovideo.jp');
          }
          /* if (event.data['eventName'] == 'player-error:video:play') {
          } */
        }
      });
    }
    MicroModal.show('modal-player', {
      onClose: () => {
        iframe.src = '';
      },
      disableScroll: true
    });
  },false);

  function checkGoogleInsert(href) {
    if (/google/.test(href)) {
      const url = new URL(href);
      const params = url.searchParams;
      return params.get('q');
    } else {
      return href;
    }
  }
},false);