import React, { useEffect, useRef } from "react";

export default function BingMapsReact({
  credentials,
  className,
  customMapStyle,
  disableBirdseye,
  disableMapTypeSelectorMouseOver,
  disableStreetside,
  disableStreetsideAutoCoverage,
  enableClickableLogo,
  id,
  navigationBarMode,
  showDashboard,
  showMapTypeSelector,
  showScalebar,
  showTermsLink
}) {
  const bingMapsScriptSrc = `https://www.bing.com/api/maps/mapcontrol?callback=GetMap`;

  // refs to store bing map and Maps class once loaded
  // call bingMap.current to perform actions on the bingmap
  const bingMap = useRef(null);
  // call Maps.current to access properties on the Maps class
  const Maps = useRef(null);
  const scriptLoadInterval = useRef(null);

  // load bing maps script to DOM on mount
  useEffect(() => {
    // create script element for bing maps script
    const scriptTag = document.createElement("script");

    // only add the script tag if it doesnt already exist
    // will prevent duplicate scripts in the event that multiple maps are mounted
    if (document.querySelector(`script[src="${bingMapsScriptSrc}"]`) === null) {
      // set script attributes
      scriptTag.defer = true;
      scriptTag.src = bingMapsScriptSrc;

      // append script to document head
      document.head.appendChild(scriptTag);
    }

    // start interval to check for script load
    scriptLoadInterval.current = window.setInterval(() => {
      // window.Microsoft will be available when the script loads
      if (window.Microsoft !== undefined) {
        // clear the interval
        window.clearInterval(scriptLoadInterval.current);
        // create a new bing map and attached it to the #map div
        Maps.current = window.Microsoft.Maps;
        bingMap.current = new Maps.current.Map(`#${id}`, {
          credentials: credentials,
          customMapStyle,
          disableBirdseye,
          disableMapTypeSelectorMouseOver,
          disableStreetside,
          disableStreetsideAutoCoverage,
          enableClickableLogo,
          navigationBarMode: Maps.current.NavigationBarMode[navigationBarMode],
          showDashboard,
          showMapTypeSelector,
          showScalebar,
          showTermsLink
        });
      }
    }, 500);

    // remove the bingmaps script tags, link tags, and clear the interval when the component unmounts
    return () => {
      // clear the interval
      window.clearInterval(scriptLoadInterval.current);
    };
  }, [
    credentials,
    bingMapsScriptSrc,
    id,
    customMapStyle,
    disableBirdseye,
    disableMapTypeSelectorMouseOver,
    disableStreetside,
    disableStreetsideAutoCoverage,
    enableClickableLogo,
    navigationBarMode,
    showDashboard,
    showMapTypeSelector,
    showScalebar,
    showTermsLink
  ]);

  return <div className={className} id={id}></div>;
}

BingMapsReact.defaultProps = {
  credentials: undefined,
  className: "bing__map",
  customMapStyle: undefined,
  disableBirdseye: false,
  disableMapTypeSelectorMouseOver: false,
  disableStreetside: false,
  disableStreetsideAutoCoverage: false,
  enableClickableLogo: true,
  id: "bing_map_0",
  navigationBarMode: "default",
  showDashboard: true,
  showMapTypeSelector: true,
  showScalebar: true,
  showTermsLink: true
};
