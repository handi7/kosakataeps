import React from "react";

export default function Adsense({ adClient, adSlot }) {
  const adCode = `
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="${adClient}"
        data-ad-slot="${adSlot}"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    `;

  return <div dangerouslySetInnerHTML={{ __html: adCode }} />;
}
