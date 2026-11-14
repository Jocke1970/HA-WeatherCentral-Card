/* HA-WeatherCentral-Card · generated bundle · MIT */
(()=>{var te=new Set(["unknown","unavailable","none","null",""]),j=["temperature","apparent_temperature","humidity","cloud_coverage","dew_point","precipitation","wind_speed","wind_gust","wind_bearing","pressure","visibility"],I={temperature:{icon:"mdi:thermometer",unit:"\xB0C",decimals:1},apparent_temperature:{icon:"mdi:thermometer-lines",unit:"\xB0C",decimals:1},humidity:{icon:"mdi:water-percent",unit:"%",decimals:0},cloud_coverage:{icon:"mdi:weather-cloudy",unit:"%",decimals:0},dew_point:{icon:"mdi:water-thermometer-outline",unit:"\xB0C",decimals:1},precipitation:{icon:"mdi:weather-rainy",unit:"mm",decimals:1},wind_speed:{icon:"mdi:weather-windy",unit:"m/s",decimals:1},wind_gust:{icon:"mdi:weather-windy-variant",unit:"m/s",decimals:1},wind_bearing:{icon:"mdi:compass-outline",unit:"\xB0",decimals:0},pressure:{icon:"mdi:gauge",unit:"mbar",decimals:0},visibility:{icon:"mdi:eye-outline",unit:"km",decimals:1}},H={temperature:["temperature"],apparent_temperature:["apparent_temperature"],humidity:["humidity"],cloud_coverage:["cloud_coverage"],dew_point:["dew_point"],precipitation:["precipitation"],wind_speed:["wind_speed"],wind_gust:["wind_gust_speed","wind_gust"],wind_bearing:["wind_bearing"],pressure:["pressure"],visibility:["visibility"]};function V(n){let e=Number(n);return Number.isFinite(e)?e:null}function C(n){return!!(n&&!te.has(String(n.state??"").toLowerCase()))}function F(n){let e=n?.last_reported||n?.last_updated||n?.last_changed;if(!e)return null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function f(n,e,t){let i=V(e);if(i===null)return null;let s=String(t||"").trim().toLowerCase();return["temperature","apparent_temperature","dew_point"].includes(n)?["\xB0f","f","fahrenheit"].includes(s)?(i-32)*5/9:i:["wind_speed","wind_gust"].includes(n)?["km/h","kmh","kph"].includes(s)?i/3.6:s==="mph"?i*.44704:["kn","kt","knot","knots"].includes(s)?i*.514444:i:n==="pressure"?s==="pa"?i/100:s==="kpa"?i*10:i:n==="visibility"?s==="m"?i/1e3:["mi","mile","miles"].includes(s)?i*1.609344:i:n==="precipitation"&&["in","inch","inches"].includes(s)?i*25.4:i}function B(n,e){let t=n?.attributes||{};return["temperature","apparent_temperature","dew_point"].includes(e)?t.temperature_unit||"\xB0C":["wind_speed","wind_gust"].includes(e)?t.wind_speed_unit||"m/s":e==="pressure"?t.pressure_unit||"hPa":e==="visibility"?t.visibility_unit||"km":["humidity","cloud_coverage"].includes(e)?"%":e==="wind_bearing"?"\xB0":e==="precipitation"?t.precipitation_unit||"mm":null}function O(n,e=1){return Number.isFinite(n)?n.toLocaleString("sv-SE",{minimumFractionDigits:e,maximumFractionDigits:e}):"\u2013"}function G(n,e="sv"){return Number.isFinite(n)?(e==="sv"?["N","N\xD6","\xD6","S\xD6","S","SV","V","NV"]:["N","NE","E","SE","S","SW","W","NW"])[Math.round((n%360+360)%360/45)%8]:"\u2013"}var U={subtitle:"V\xE4der\xF6versikt",temperature:"Temperatur",apparent_temperature:"K\xE4nns som",humidity:"Fukt",cloud_coverage:"Moln",dew_point:"Daggpunkt",precipitation:"Nederb\xF6rd",wind_speed:"Vind",wind_gust:"Vindby",wind_bearing:"Riktning",pressure:"Lufttryck",visibility:"Sikt",no_data:"Ingen anv\xE4ndbar data",view_overview:"\xD6versikt",view_temperature:"Temperatur 12 h",view_precipitation:"Nederb\xF6rd 12 h",view_forecast:"7-dygnsprognos",view_wind:"Vind & luft",view_pressure:"Lufttryck",view_diagnostics:"Diagnostik",next_12_hours:"Kommande 12 timmar",today_plus_6:"Idag + 6 dagar",precipitation_probability:"Regnrisk",high:"H\xF6gst",low:"L\xE4gst",editor_weather:"V\xE4derk\xE4lla",editor_view:"Vy",editor_sources:"Visa k\xE4llor",editor_freshness:"Visa freshness",editor_fallbacks:"Anv\xE4nd fallback",editor_advanced:"Avancerade datak\xE4llor",editor_primary:"Prim\xE4r entity",editor_fallback1:"Fallback 1",editor_fallback2:"Fallback 2",editor_hint:"Tomma f\xE4lt anv\xE4nder providerprofilen och d\xE4refter weather-entitetens kompatibla attribut.",fresh:"F\xE4rsk",aging:"\xC5ldrande",stale:"F\xF6r gammal",unknown:"Freshness ok\xE4nd","clear-night":"Klart",cloudy:"Mulet",fog:"Dimma",hail:"Hagel",lightning:"\xC5ska","lightning-rainy":"\xC5ska och regn",partlycloudy:"Delvis molnigt",pouring:"Skyfall",rainy:"Regn",snowy:"Sn\xF6","snowy-rainy":"Sn\xF6blandat regn",sunny:"Soligt",windy:"Bl\xE5sigt","windy-variant":"Bl\xE5sigt",data_coverage:"Datat\xE4ckning",missing:"Saknas"};var q={subtitle:"Weather overview",temperature:"Temperature",apparent_temperature:"Feels like",humidity:"Humidity",cloud_coverage:"Clouds",dew_point:"Dew point",precipitation:"Precipitation",wind_speed:"Wind",wind_gust:"Wind gust",wind_bearing:"Direction",pressure:"Pressure",visibility:"Visibility",no_data:"No usable data",view_overview:"Overview",view_temperature:"Temperature 12 h",view_precipitation:"Precipitation 12 h",view_forecast:"7-day forecast",view_wind:"Wind & air",view_pressure:"Pressure",view_diagnostics:"Diagnostics",next_12_hours:"Next 12 hours",today_plus_6:"Today + 6 days",precipitation_probability:"Rain chance",high:"High",low:"Low",editor_weather:"Weather source",editor_view:"View",editor_sources:"Show sources",editor_freshness:"Show freshness",editor_fallbacks:"Use fallbacks",editor_advanced:"Advanced data sources",editor_primary:"Primary entity",editor_fallback1:"Fallback 1",editor_fallback2:"Fallback 2",editor_hint:"Empty fields use the provider profile and then compatible weather-entity attributes.",fresh:"Fresh",aging:"Aging",stale:"Stale",unknown:"Freshness unknown","clear-night":"Clear",cloudy:"Cloudy",fog:"Fog",hail:"Hail",lightning:"Lightning","lightning-rainy":"Lightning and rain",partlycloudy:"Partly cloudy",pouring:"Pouring",rainy:"Rain",snowy:"Snow","snowy-rainy":"Sleet",sunny:"Sunny",windy:"Windy","windy-variant":"Windy",data_coverage:"Data coverage",missing:"Missing"};var K={sv:U,en:q};function A(n){return String(n?.language||n?.locale?.language||"en").toLowerCase().startsWith("sv")?"sv":"en"}function c(n,e){return K[n]?.[e]||K.en[e]||e}var J=[{id:"smhi_local",label:"SMHI Local",matchWeather:n=>n==="weather.smhi_local"||String(n||"").includes("smhi_local"),entities:{temperature:"sensor.smhi_local_temperatur",apparent_temperature:"sensor.smhi_local_kanns_som",humidity:"sensor.smhi_local_luftfuktighet",cloud_coverage:"sensor.smhi_local_molnmangd",wind_speed:"sensor.smhi_local_vindhastighet",wind_gust:"sensor.smhi_local_vindby",pressure:"sensor.smhi_local_lufttryck",visibility:"sensor.smhi_local_sikt"},forecastFreshnessEntity:"sensor.smhi_local_prognos_skapad",freshness:{greenMinutes:20,yellowMinutes:90},forecastFreshness:{greenMinutes:180,yellowMinutes:360}},{id:"pirateweather",label:"Pirate Weather",matchWeather:n=>n==="weather.pirateweather"||String(n||"").includes("pirateweather"),entities:{apparent_temperature:"sensor.pirateweather_apparent_temperature",humidity:"sensor.pirateweather_humidity",cloud_coverage:"sensor.pirateweather_cloud_coverage",dew_point:"sensor.pirateweather_dew_point",precipitation:"sensor.pirateweather_precip_intensity",wind_gust:"sensor.pirateweather_wind_gust",wind_bearing:"sensor.pirateweather_wind_bearing",pressure:"sensor.pirateweather_pressure",visibility:"sensor.pirateweather_visibility"},freshness:{greenMinutes:35,yellowMinutes:120}},{id:"met",label:"MET Norway",matchWeather:n=>/forecast_home|met_no|met\.no|met_norway/i.test(String(n||"")),entities:{},freshness:{greenMinutes:35,yellowMinutes:120}},{id:"open_meteo",label:"Open-Meteo",matchWeather:n=>/open.?meteo|weather\.garaget/i.test(String(n||"")),entities:{},freshness:{greenMinutes:45,yellowMinutes:150}},{id:"owm",label:"OpenWeatherMap",matchWeather:n=>/openweathermap|owm/i.test(String(n||"")),entities:{},freshness:{greenMinutes:45,yellowMinutes:150}}];function Q(n){return J.find(e=>e.matchWeather(n))||null}function z(n,e){if(!n)return{id:"unknown",label:"Unknown",entities:{}};if(/vaderkonsensus|weather_consensus|weather.*consensus/i.test(n))return{id:"consensus",label:"Weather Consensus",entities:{}};for(let i of J)if(i.matchWeather(n)||Object.values(i.entities||{}).includes(n))return i;return{id:"custom",label:e?.states?.[n]?.attributes?.friendly_name||n,entities:{},freshness:{greenMinutes:45,yellowMinutes:120}}}function re(n,e){let t=n?.states?.[e];if(!C(t))return null;let i=Date.parse(t.state);return Number.isFinite(i)?i:F(t)}function ne(n,e,t,i=!1){let s=i?t?.forecastFreshness||{greenMinutes:180,yellowMinutes:360}:t?.freshness||{greenMinutes:45,yellowMinutes:120},r=null;if(i&&t?.forecastFreshnessEntity&&(r=re(n,t.forecastFreshnessEntity)),!r&&e&&(r=F(n?.states?.[e])),!r)return{status:"unknown",ageMinutes:null,timestamp:null};let o=Math.max(0,(Date.now()-r)/6e4);return o<=s.greenMinutes?{status:"fresh",ageMinutes:o,timestamp:r}:o<=s.yellowMinutes?{status:"aging",ageMinutes:o,timestamp:r}:{status:"stale",ageMinutes:o,timestamp:r}}function oe(n,e,t){let i=n?.states?.[e];if(!C(i))return null;for(let s of H[t]||[]){let r=i.attributes?.[s];if(r==null)continue;let o=f(t,r,B(i,t));if(o!==null)return{value:o,entityId:e,weatherAttribute:s}}return null}function ae(n,e,t){if(!e)return null;if(e.startsWith("weather."))return oe(n,e,t);let i=n?.states?.[e];if(!C(i))return null;let s=f(t,i.state,i.attributes?.unit_of_measurement);return s===null?null:{value:s,entityId:e}}var R=class{constructor(e,t){this.hass=e,this.config=t||{},this.selectedSources=new Map,this.freshSince=new Map}update(e,t){this.hass=e,this.config=t||{}}baseProvider(){return Q(this.config.weather_entity)||{id:"generic",label:this.hass?.states?.[this.config.weather_entity]?.attributes?.friendly_name||"Weather",entities:{},freshness:{greenMinutes:45,yellowMinutes:120}}}parameterConfig(e){let t=this.config.parameters?.[e]||{};return{primary:t.primary||null,fallbacks:Array.isArray(t.fallbacks)?t.fallbacks.filter(Boolean):[]}}candidates(e){let t=this.baseProvider(),i=this.parameterConfig(e),s=[],r=(o,l,d=!1)=>{o&&(s.some(p=>p.entityId===o)||s.push({entityId:o,role:l,useForecastClock:d}))};if(i.primary&&(r(i.primary,"manual-primary"),this.config.use_fallbacks!==!1))for(let o of i.fallbacks)r(o,"manual-fallback");if(r(t.entities?.[e],"provider",t.id==="smhi_local"),r(this.config.weather_entity,"base-weather",t.id==="smhi_local"),this.config.use_fallbacks!==!1){if(!i.primary)for(let o of i.fallbacks)r(o,"manual-fallback");r(this.config.fallback_weather_1,"fallback-weather"),r(this.config.fallback_weather_2,"fallback-weather")}return s}resolveCandidate(e,t,i){let s=ae(this.hass,t.entityId,e);if(!s)return null;let r=z(t.entityId,this.hass);r.id==="custom"&&t.entityId===this.config.weather_entity&&(r=this.baseProvider());let o=ne(this.hass,t.entityId,r,t.useForecastClock&&r.id==="smhi_local");return{param:e,value:s.value,entityId:t.entityId,source:r.label,sourceId:r.id,role:t.role,fallbackLevel:i,freshness:o,stale:o.status==="stale"}}trackFresh(e,t){if(!t)return;let i=`${e}:${t.entityId}`;t.freshness.status==="fresh"?this.freshSince.has(i)||this.freshSince.set(i,Date.now()):this.freshSince.delete(i)}resolve(e){let t=this.candidates(e).map((l,d)=>this.resolveCandidate(e,l,d)).filter(Boolean);for(let l of t)this.trackFresh(e,l);if(!t.length)return null;let s=t.filter(l=>!l.stale)[0]||t[0],r=this.selectedSources.get(e),o=t.find(l=>l.entityId===r);if(o&&!o.stale&&s.entityId!==o.entityId&&s.fallbackLevel<o.fallbackLevel){let l=`${e}:${s.entityId}`,d=this.freshSince.get(l)||Date.now(),p=Math.max(0,Number(this.config.recovery_grace_seconds??120))*1e3;Date.now()-d<p&&(s=o)}return this.selectedSources.set(e,s.entityId),s}};function ce(n,e){let t=n?.states?.[e];if(!t)return null;let i=Date.parse(t.state);return Number.isFinite(i)?i:F(t)}function le(n,e,t,i){let s=t?.forecastFreshness||{greenMinutes:90,yellowMinutes:240},r=null;if(t?.forecastFreshnessEntity&&(r=ce(n,t.forecastFreshnessEntity)),r||(r=i||null),!r)return{status:"unknown",ageMinutes:null,timestamp:null};let o=Math.max(0,(Date.now()-r)/6e4);return o<=s.greenMinutes?{status:"fresh",ageMinutes:o,timestamp:r}:o<=s.yellowMinutes?{status:"aging",ageMinutes:o,timestamp:r}:{status:"stale",ageMinutes:o,timestamp:r}}function de(n,e,t){if(!t||!t.datetime)return null;let s=n?.states?.[e]?.attributes||{},r=s.temperature_unit||"\xB0C",o=s.wind_speed_unit||"m/s",l=s.pressure_unit||"hPa",d=s.precipitation_unit||"mm",p=S=>{let v=V(t[S]);return v===null?null:v},m=t.temperature==null?null:f("temperature",t.temperature,r),g=t.templow==null?null:f("temperature",t.templow,r),_=t.apparent_temperature==null?null:f("apparent_temperature",t.apparent_temperature,r),y=t.dew_point==null?null:f("dew_point",t.dew_point,r),b=t.precipitation==null?null:f("precipitation",t.precipitation,d),x=t.pressure==null?null:f("pressure",t.pressure,l),$=t.wind_speed==null?null:f("wind_speed",t.wind_speed,o),k=t.wind_gust_speed==null?null:f("wind_gust",t.wind_gust_speed,o);return{datetime:t.datetime,condition:t.condition||null,is_daytime:typeof t.is_daytime=="boolean"?t.is_daytime:null,temperature:m,templow:g,apparent_temperature:_,dew_point:y,precipitation:b,precipitation_probability:p("precipitation_probability"),humidity:p("humidity"),cloud_coverage:p("cloud_coverage"),pressure:x,wind_bearing:t.wind_bearing??null,wind_speed:$,wind_gust_speed:k}}function ue(n){let e=n.filter(i=>Array.isArray(i?.forecast)&&i.forecast.length>0);return e.length?e.find(i=>i.freshness?.status!=="stale")||e[0]:null}var T=class{constructor(e){this.onChange=e,this.hass=null,this.config={},this.connection=null,this.subscriptions=new Map,this.series=new Map}update(e,t){this.connection&&e?.connection&&this.connection!==e.connection&&this.disconnect(),this.hass=e,this.config=t||{},this.connection=e?.connection||null}entities(){let e=[],t=i=>{i&&i.startsWith("weather.")&&!e.includes(i)&&e.push(i)};return t(this.config.weather_entity),this.config.use_fallbacks!==!1&&(t(this.config.fallback_weather_1),t(this.config.fallback_weather_2)),e}ensure(e){this._ensure(e).catch(t=>{console.warn("Weather Central forecast subscription failed",e,t)})}async _ensure(e){if(!this.connection)return;let t=new Set(this.entities().map(i=>`${i}|${e}`));for(let[i,s]of this.subscriptions)if(i.endsWith(`|${e}`)&&!t.has(i)){this.subscriptions.delete(i);try{(await s.unsubscribePromise)?.()}catch{}}for(let i of this.entities()){let s=`${i}|${e}`;if(this.subscriptions.has(s))continue;let r=this.connection.subscribeMessage(o=>{let l=Array.isArray(o?.forecast)?o.forecast.map(d=>de(this.hass,i,d)).filter(Boolean):[];this.series.set(s,{entityId:i,type:e,forecast:l,receivedAt:Date.now()}),this.onChange?.()},{type:"weather/subscribe_forecast",forecast_type:e,entity_id:i});this.subscriptions.set(s,{entityId:i,type:e,unsubscribePromise:r})}}get(e){let t=this.entities().map((i,s)=>{let r=`${i}|${e}`,o=this.series.get(r);if(!o)return null;let l=z(i,this.hass);return{...o,source:l.label,sourceId:l.id,fallbackLevel:s,freshness:le(this.hass,i,l,o.receivedAt)}}).filter(Boolean);return ue(t)}disconnect(){let e=[...this.subscriptions.values()];this.subscriptions.clear(),this.series.clear();for(let t of e)Promise.resolve(t.unsubscribePromise).then(i=>i?.()).catch(()=>{})}};var X="2026.11.0b2",he={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},pe=`
  :host{display:block;min-width:0}
  ha-card{padding:16px;overflow:hidden}
  .top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}
  .heading{display:flex;align-items:center;gap:12px;min-width:0}
  .hero-icon{--mdc-icon-size:52px;color:var(--primary-color)}
  .title{font-size:12px;color:var(--secondary-text-color)}
  .condition{font-size:18px;font-weight:650;line-height:1.2;margin-top:2px}
  .provider{font-size:10px;color:var(--secondary-text-color);white-space:nowrap}
  .main{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:end;margin:2px 0 14px}
  .big{font-size:38px;font-weight:650;line-height:1}
  .secondary{font-size:12px;color:var(--secondary-text-color);margin-top:5px}
  .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .tile{padding:11px;border-radius:12px;background:var(--secondary-background-color);min-width:0}
  .tile-head{display:flex;align-items:center;gap:7px;color:var(--secondary-text-color);font-size:11px}
  .tile-head ha-icon{--mdc-icon-size:19px;color:var(--primary-color);flex:none}
  .tile-value{font-size:18px;font-weight:650;margin-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .meta{display:flex;align-items:center;gap:5px;margin-top:5px;font-size:9.5px;color:var(--secondary-text-color);min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .dot{width:7px;height:7px;border-radius:50%;display:inline-block;flex:none;background:var(--disabled-text-color)}
  .dot.fresh{background:var(--success-color,#43a047)}
  .dot.aging{background:var(--warning-color,#f9a825)}
  .dot.stale{background:var(--error-color,#e53935)}
  .dot.unknown{background:var(--disabled-text-color,#9e9e9e)}
  .fallback{opacity:.9}
  .section-title{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:650;margin-bottom:12px}
  .section-title ha-icon{--mdc-icon-size:23px;color:var(--primary-color)}
  .diag{display:grid;gap:7px}
  .diag-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;padding:9px 0;border-top:1px solid var(--divider-color)}
  .diag-row:first-child{border-top:0}
  .diag-name{font-size:12px;font-weight:600;overflow:hidden;text-overflow:ellipsis}
  .diag-sub{font-size:10px;color:var(--secondary-text-color);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .diag-value{text-align:right;font-size:12px;white-space:nowrap}
  .empty{padding:22px 8px;text-align:center;color:var(--secondary-text-color)}
  .footer{margin-top:12px;padding-top:10px;border-top:1px solid var(--divider-color);display:flex;justify-content:space-between;gap:10px;font-size:9.5px;color:var(--secondary-text-color)}
  .forecast-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
  .forecast-sub{font-size:11px;color:var(--secondary-text-color)}
  .hours{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px}
  .hour{padding:8px 3px;border-radius:10px;background:var(--secondary-background-color);text-align:center;min-width:0}
  .hour-time{font-size:10px;color:var(--secondary-text-color)}
  .hour-main{font-size:15px;font-weight:650;margin-top:4px;white-space:nowrap}
  .hour-sub{font-size:9.5px;color:var(--secondary-text-color);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .forecast-days{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}
  .day{padding:10px 5px;border-radius:12px;background:var(--secondary-background-color);text-align:center;min-width:0}
  .day ha-icon{--mdc-icon-size:29px;color:var(--primary-color);margin:7px 0 3px}
  .day-name{font-size:12px;font-weight:650}
  .day-date{font-size:9.5px;color:var(--secondary-text-color);margin-top:1px}
  .day-temp{font-size:16px;font-weight:650;margin-top:5px}
  .day-low{font-size:12px;color:var(--secondary-text-color);font-weight:400;margin-left:3px}
  .series-meta{display:flex;align-items:center;justify-content:flex-end;gap:5px;font-size:9.5px;color:var(--secondary-text-color);margin-top:9px}
  .temp-chart{width:100%;height:auto;display:block;overflow:visible;margin-top:4px}
  @media(max-width:420px){ha-card{padding:13px}.big{font-size:34px}.hero-icon{--mdc-icon-size:46px}}
`;function a(n){return String(n??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function fe(n){return n?.freshness?.status||"unknown"}function Y(n){return he[n]||"mdi:weather-partly-cloudy"}var W=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._config={},this._hass=null,this._resolver=null,this._forecast=new T(()=>this._scheduleRender()),this._scheduled=!1,this.shadowRoot.addEventListener("click",e=>{let i=e.target.closest?.("[data-more-info]")?.dataset?.moreInfo;i&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}))})}static async getConfigElement(){return document.createElement("weather-central-card-editor")}static getStubConfig(e){return{type:"custom:weather-central-card",weather_entity:Object.keys(e?.states||{}).find(i=>i==="weather.smhi_local")||Object.keys(e?.states||{}).find(i=>i.startsWith("weather."))||"",view:"overview",show_sources:!0,show_freshness:!0,use_fallbacks:!0}}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid card configuration");if(!e.weather_entity)throw new Error("weather_entity is required");this._config={view:"overview",show_sources:!0,show_freshness:!0,use_fallbacks:!0,recovery_grace_seconds:120,...e},this._resolver&&this._resolver.update(this._hass,this._config),this._forecast.update(this._hass,this._config),this._updateForecastSubscriptions(),this._scheduleRender()}set hass(e){this._hass=e,this._resolver?this._resolver.update(e,this._config):this._resolver=new R(e,this._config),this._forecast.update(e,this._config),this._updateForecastSubscriptions(),this._scheduleRender()}get hass(){return this._hass}disconnectedCallback(){this._forecast.disconnect()}_updateForecastSubscriptions(){let e=this._config.view||"overview";["temperature","precipitation","pressure"].includes(e)&&this._forecast.ensure("hourly"),e==="forecast"&&this._forecast.ensure("daily")}getCardSize(){return this._config.view==="diagnostics"?5:4}getGridOptions(){return{rows:4,columns:12,min_rows:3,min_columns:6}}_scheduleRender(){this._scheduled||(this._scheduled=!0,queueMicrotask(()=>{this._scheduled=!1,this._render()}))}_meta(e,t,i=!1){if(!e||!this._config.show_sources&&!this._config.show_freshness)return"";let s=this._config.show_freshness?`<span class="dot ${fe(e)}" title="${a(c(t,e.freshness.status))}"></span>`:"",r=e.fallbackLevel>0?'<span class="fallback">\u21B3</span>':"",o=this._resolver?.baseProvider()?.label,l=i&&e.fallbackLevel===0&&e.source===o,d=this._config.show_sources&&!l?a(e.source):"";return!s&&!r&&!d?"":`<div class="meta">${s}${r}${d}</div>`}_formatReading(e,t,i){if(!t)return"\u2013";let s=I[e];return e==="wind_bearing"?`${G(t.value,i)} ${Math.round(t.value)}\xB0`:`${O(t.value,s?.decimals??1)} ${s?.unit||""}`.trim()}_tile(e,t,i){let s=I[e]||{};return`
      <div class="tile"${t?.entityId?` data-more-info="${a(t.entityId)}"`:""}>
        <div class="tile-head">
          <ha-icon icon="${s.icon||"mdi:information-outline"}"></ha-icon>
          <span>${a(c(i,e))}</span>
        </div>
        <div class="tile-value">${a(this._formatReading(e,t,i))}</div>
        ${this._meta(t,i,!0)}
      </div>
    `}_overview(e){let t=this._hass?.states?.[this._config.weather_entity];if(!t)return`<div class="empty">${a(c(e,"no_data"))}: ${a(this._config.weather_entity)}</div>`;let i=this._resolver.baseProvider(),s=this._resolver.resolve("temperature"),r=this._resolver.resolve("apparent_temperature"),o=this._resolver.resolve("humidity"),l=this._resolver.resolve("cloud_coverage"),d=this._resolver.resolve("wind_speed"),p=this._resolver.resolve("visibility"),m=t.state;return`
      <div class="top">
        <div class="heading">
          <ha-icon
            class="hero-icon"
            icon="${Y(m)}"
          ></ha-icon>
          <div>
            <div class="title">${a(c(e,"subtitle"))}</div>
            <div class="condition">${a(c(e,m))}</div>
          </div>
        </div>
        <div class="provider">${a(i.label)}</div>
      </div>

      <div class="main">
        <div>
          <div class="big">${a(this._formatReading("temperature",s,e))}</div>
          <div class="secondary">
            ${r?`${a(c(e,"apparent_temperature"))} ${a(this._formatReading("apparent_temperature",r,e))}`:""}
          </div>
          ${this._meta(s,e,!0)}
        </div>
      </div>

      <div class="grid">
        ${this._tile("humidity",o,e)}
        ${this._tile("cloud_coverage",l,e)}
        ${this._tile("wind_speed",d,e)}
        ${this._tile("visibility",p,e)}
      </div>
    `}_seriesMeta(e,t){if(!e||!this._config.show_sources&&!this._config.show_freshness)return"";let i=this._config.show_freshness?`<span class="dot ${e.freshness?.status||"unknown"}" title="${a(c(t,e.freshness?.status||"unknown"))}"></span>`:"",s=e.fallbackLevel>0?'<span class="fallback">\u21B3</span>':"",r=this._config.show_sources?a(e.source):"";return`<div class="series-meta">${i}${s}${r}</div>`}_hourlySeries(){let e=this._forecast.get("hourly");if(!e)return null;let t=Date.now()-45*6e4;return{...e,forecast:e.forecast.filter(i=>Date.parse(i.datetime)>=t).slice(0,12)}}_temperatureForecast(e){let t=this._hourlySeries(),i=(t?.forecast||[]).filter(h=>Number.isFinite(h.temperature));if(i.length<2)return`<div class="empty">${a(c(e,"no_data"))}</div>`;let s=620,r=178,o=28,l=28,d=28,p=40,m=i.map(h=>h.temperature),g=Math.min(...m),_=Math.max(...m),y=Math.max(2,_-g),b=g-1,x=_+1,$=Math.max(2,x-b),k=s-o-l,S=r-d-p,v=i.map((h,u)=>{let w=o+u*k/Math.max(1,i.length-1),E=d+(x-h.temperature)/$*S,P=new Date(h.datetime);return{x:w,y:E,value:h.temperature,time:P.toLocaleTimeString(e==="sv"?"sv-SE":"en-GB",{hour:"2-digit",minute:"2-digit"})}}),M=v.map(h=>`${h.x},${h.y}`).join(" "),N=v.map((h,u)=>u===0||u===v.length-1||u%2===0?`<circle cx="${h.x}" cy="${h.y}" r="3.7" fill="var(--primary-color)"/><text x="${h.x}" y="${h.y-9}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--primary-text-color)">${Math.round(h.value)}\xB0</text><text x="${h.x}" y="${r-12}" text-anchor="middle" font-size="9.5" fill="var(--secondary-text-color)">${a(h.time)}</text>`:`<circle cx="${h.x}" cy="${h.y}" r="3.2" fill="var(--primary-color)"/>`).join("");return`<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:thermometer"></ha-icon>${a(c(e,"view_temperature"))}</div><div class="forecast-sub">${a(c(e,"next_12_hours"))}</div></div><svg class="temp-chart" viewBox="0 0 ${s} ${r}"><line x1="${o}" y1="${r-p}" x2="${s-l}" y2="${r-p}" stroke="var(--divider-color)" stroke-width="1"/><polyline points="${M}" fill="none" stroke="var(--primary-color)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>${N}</svg>`+this._seriesMeta(t,e)}_precipitationForecast(e){let t=this._hourlySeries(),i=t?.forecast||[];if(!i.length)return`<div class="empty">${a(c(e,"no_data"))}</div>`;let s=i.map(r=>{let l=new Date(r.datetime).toLocaleTimeString(e==="sv"?"sv-SE":"en-GB",{hour:"2-digit",minute:"2-digit"}),d=Number.isFinite(r.precipitation_probability)?`${Math.round(r.precipitation_probability)} %`:"\u2013",p=Number.isFinite(r.precipitation)?`${O(r.precipitation,1)} mm`:"\u2013";return`<div class="hour"><div class="hour-time">${a(l)}</div><div class="hour-main">${a(d)}</div><div class="hour-sub">${a(p)}</div></div>`}).join("");return`<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:weather-rainy"></ha-icon>${a(c(e,"view_precipitation"))}</div><div class="forecast-sub">${a(c(e,"next_12_hours"))}</div></div><div class="hours">${s}</div>`+this._seriesMeta(t,e)}_dailyForecast(e){let t=this._forecast.get("daily"),i=(t?.forecast||[]).slice(0,7);if(!i.length)return`<div class="empty">${a(c(e,"no_data"))}</div>`;let s=e==="sv"?"sv-SE":"en-GB",r=i.map((o,l)=>{let d=new Date(o.datetime),p=l===0?e==="sv"?"Idag":"Today":d.toLocaleDateString(s,{weekday:"short"}).replace(".",""),m=d.toLocaleDateString(s,{day:"numeric",month:"numeric"}),g=Number.isFinite(o.temperature)?`${Math.round(o.temperature)}\xB0`:"\u2013",_=Number.isFinite(o.templow)?`${Math.round(o.templow)}\xB0`:"",y=Number.isFinite(o.precipitation_probability)?`${Math.round(o.precipitation_probability)} %`:"\u2013";return`<div class="day"><div class="day-name">${a(p)}</div><div class="day-date">${a(m)}</div><ha-icon icon="${Y(o.condition)}"></ha-icon><div class="day-temp">${a(g)}<span class="day-low">${a(_)}</span></div><div class="hour-sub">\u{1F4A7} ${a(y)}</div></div>`}).join("");return`<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:calendar-week"></ha-icon>${a(c(e,"view_forecast"))}</div><div class="forecast-sub">${a(c(e,"today_plus_6"))}</div></div><div class="forecast-days">${r}</div>`+this._seriesMeta(t,e)}_wind(e){let t=this._resolver.resolve("wind_speed"),i=this._resolver.resolve("wind_gust"),s=this._resolver.resolve("wind_bearing"),r=this._resolver.resolve("pressure"),o=this._resolver.resolve("visibility"),l=this._resolver.resolve("humidity");return`
      <div class="section-title">
        <ha-icon icon="mdi:weather-windy"></ha-icon>
        ${a(c(e,"view_wind"))}
      </div>
      <div class="grid">
        ${this._tile("wind_speed",t,e)}
        ${this._tile("wind_gust",i,e)}
        ${this._tile("wind_bearing",s,e)}
        ${this._tile("pressure",r,e)}
        ${this._tile("visibility",o,e)}
        ${this._tile("humidity",l,e)}
      </div>
    `}_pressure(e){let t=this._resolver.resolve("pressure"),i=this._hourlySeries(),s=(i?.forecast||[]).filter(o=>Number.isFinite(o.pressure)),r="";if(s.length>=2){let _=s.map(u=>u.pressure),y=Math.min(..._),b=Math.max(..._),x=y-1,$=b+1,k=Math.max(2,$-x),S=564,v=94,M=s.map((u,w)=>{let E=28+w*S/Math.max(1,s.length-1),P=22+($-u.pressure)/k*v,ee=new Date(u.datetime).toLocaleTimeString(e==="sv"?"sv-SE":"en-GB",{hour:"2-digit",minute:"2-digit"});return{x:E,y:P,value:u.pressure,time:ee}}),N=M.map(u=>`${u.x},${u.y}`).join(" "),h=M.map((u,w)=>w===0||w===M.length-1||w%3===0?`<circle cx="${u.x}" cy="${u.y}" r="3.5" fill="var(--primary-color)"/><text x="${u.x}" y="${u.y-8}" text-anchor="middle" font-size="10" font-weight="600" fill="var(--primary-text-color)">${Math.round(u.value)}</text><text x="${u.x}" y="140" text-anchor="middle" font-size="9" fill="var(--secondary-text-color)">${a(u.time)}</text>`:`<circle cx="${u.x}" cy="${u.y}" r="3" fill="var(--primary-color)"/>`).join("");r=`<div class="forecast-sub">${a(c(e,"next_12_hours"))} \xB7 ${Math.round(y)}\u2013${Math.round(b)} mbar</div><svg class="temp-chart" viewBox="0 0 620 150"><line x1="28" y1="116" x2="592" y2="116" stroke="var(--divider-color)" stroke-width="1"/><polyline points="${N}" fill="none" stroke="var(--primary-color)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>${h}</svg>`+this._seriesMeta(i,e)}return`
      <div class="section-title">
        <ha-icon icon="mdi:gauge"></ha-icon>
        ${a(c(e,"view_pressure"))}
      </div>

      ${t?`<div class="main"><div>
            <div class="big">${a(this._formatReading("pressure",t,e))}</div>
            ${this._meta(t,e)}
          </div></div>`:`<div class="empty">${a(c(e,"no_data"))}</div>`}

      ${r}

      <div class="footer">
        <span></span>
        <span>${X}</span>
      </div>
    `}_diagnostics(e){let t=this._resolver.baseProvider(),i=j.map(o=>({param:o,reading:this._resolver.resolve(o)})),s=i.filter(o=>o.reading).length,r=i.map(({param:o,reading:l})=>{let d=l?a(this._formatReading(o,l,e)):`<span style="color:var(--secondary-text-color)">${a(c(e,"missing"))}</span>`,p=l?this._meta(l,e):'<div class="meta"><span class="dot unknown"></span></div>';return`
        <div class="diag-row">
          <div>
            <div class="diag-name">${a(c(e,o))}</div>
            <div class="diag-sub">${a(l?.entityId||"\u2014")}</div>
          </div>
          <div class="diag-value">
            ${d}
            ${p}
          </div>
        </div>
      `}).join("");return`
      <div class="section-title">
        <ha-icon icon="mdi:stethoscope"></ha-icon>
        ${a(c(e,"view_diagnostics"))}
      </div>
      <div class="secondary" style="margin-bottom:8px">
        ${a(c(e,"data_coverage"))}: <b>${s}/${j.length}</b>
        \xB7 ${a(t.label)} \xB7 ${X}
      </div>
      <div class="diag">${r}</div>
    `}_render(){if(!this._hass||!this._config?.weather_entity||!this._resolver)return;let e=A(this._hass),t=this._config.view||"overview",i;t==="temperature"?i=this._temperatureForecast(e):t==="precipitation"?i=this._precipitationForecast(e):t==="forecast"?i=this._dailyForecast(e):t==="wind"?i=this._wind(e):t==="pressure"?i=this._pressure(e):t==="diagnostics"?i=this._diagnostics(e):i=this._overview(e),this.shadowRoot.innerHTML=`<style>${pe}</style><ha-card>${i}</ha-card>`}};var me=["temperature","apparent_temperature","humidity","cloud_coverage","wind_speed","wind_gust","pressure","visibility"],_e=`
  :host{display:block;padding:4px 0}
  .wrap{display:grid;gap:14px}
  .row{display:grid;gap:6px}
  label{font-size:12px;color:var(--secondary-text-color)}
  select{box-sizing:border-box;width:100%;min-height:44px;border:1px solid var(--divider-color);border-radius:8px;background:var(--card-background-color);color:var(--primary-text-color);padding:8px 10px;font:inherit}
  .toggle{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:42px}
  .toggle span{font-size:13px}
  details{border-top:1px solid var(--divider-color);padding-top:12px}
  summary{cursor:pointer;font-weight:650;font-size:13px}
  .hint{font-size:11px;color:var(--secondary-text-color);line-height:1.4;margin-top:6px}
  .param{padding:12px 0;border-top:1px solid var(--divider-color)}
  .param:first-of-type{border-top:0}
  .param-title{font-size:12px;font-weight:650;margin-bottom:8px}
  .cols{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  @media(max-width:520px){.cols{grid-template-columns:1fr}}
`,D=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._hass=null,this._config={},this._rendered=!1,this.shadowRoot.addEventListener("change",e=>this._onChange(e)),this.shadowRoot.addEventListener("value-changed",e=>this._onValueChanged(e))}set hass(e){this._hass=e,this._rendered?this._syncPickers():this._render()}get hass(){return this._hass}setConfig(e){this._config={view:"overview",show_sources:!0,show_freshness:!0,use_fallbacks:!0,...e||{}},this._render()}_emit(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...e}},bubbles:!0,composed:!0}))}_setField(e,t){let i={...this._config};t===""||t==null?delete i[e]:i[e]=t,this._emit(i)}_setParam(e,t,i){var r;let s=JSON.parse(JSON.stringify(this._config||{}));s.parameters||(s.parameters={}),(r=s.parameters)[e]||(r[e]={}),t==="primary"?i?s.parameters[e].primary=i:delete s.parameters[e].primary:t==="fallback1"&&(s.parameters[e].fallbacks=i?[i]:[],i||delete s.parameters[e].fallbacks),!s.parameters[e].primary&&!(s.parameters[e].fallbacks||[]).length&&delete s.parameters[e],Object.keys(s.parameters).length||delete s.parameters,this._emit(s)}_onChange(e){let t=e.target,i=t?.dataset?.field;if(!(!i||t?.dataset?.param||t?.tagName?.toLowerCase()==="ha-entity-picker")){if(["show_sources","show_freshness","use_fallbacks"].includes(i)){this._setField(i,!!t.checked);return}this._setField(i,t.value)}}_onValueChanged(e){let t=e.target,i=t?.dataset?.field,s=t?.dataset?.param,r=e.detail?.value||"";s&&i?this._setParam(s,i,r):i&&this._setField(i,r)}_picker(e,t,i=null){return`
      <ha-entity-picker
        data-field="${e}"
        ${i?`data-param="${i}"`:""}
        value="${t||""}"
      ></ha-entity-picker>
    `}_syncPickers(){this.shadowRoot.querySelectorAll("ha-entity-picker").forEach(e=>{e.hass=this._hass;let t=e.dataset.field;(t==="weather_entity"||t.startsWith("fallback_weather"))&&(e.includeDomains=["weather"])})}_render(){let e=A(this._hass),t=this._config||{},i=me.map(s=>{let r=t.parameters?.[s]||{};return`
        <div class="param">
          <div class="param-title">${c(e,s)}</div>
          <div class="cols">
            <div class="row">
              <label>${c(e,"editor_primary")}</label>
              ${this._picker("primary",r.primary,s)}
            </div>
            <div class="row">
              <label>${c(e,"editor_fallback1")}</label>
              ${this._picker("fallback1",r.fallbacks?.[0],s)}
            </div>
          </div>
        </div>
      `}).join("");this.shadowRoot.innerHTML=`
      <style>${_e}</style>
      <div class="wrap">
        <div class="row">
          <label>${c(e,"editor_weather")}</label>
          ${this._picker("weather_entity",t.weather_entity)}
        </div>

        <div class="row">
          <label>${c(e,"editor_view")}</label>
          <select data-field="view">
            <option value="overview" ${t.view==="overview"?"selected":""}>
              ${c(e,"view_overview")}
            </option>
            <option value="temperature" ${t.view==="temperature"?"selected":""}>
              ${c(e,"view_temperature")}
            </option>
            <option value="precipitation" ${t.view==="precipitation"?"selected":""}>
              ${c(e,"view_precipitation")}
            </option>
            <option value="forecast" ${t.view==="forecast"?"selected":""}>
              ${c(e,"view_forecast")}
            </option>
            <option value="wind" ${t.view==="wind"?"selected":""}>
              ${c(e,"view_wind")}
            </option>
            <option value="pressure" ${t.view==="pressure"?"selected":""}>
              ${c(e,"view_pressure")}
            </option>
            <option value="diagnostics" ${t.view==="diagnostics"?"selected":""}>
              ${c(e,"view_diagnostics")}
            </option>
          </select>
        </div>

        <div class="toggle">
          <span>${c(e,"editor_sources")}</span>
          <input
            data-field="show_sources"
            type="checkbox"
            ${t.show_sources!==!1?"checked":""}
          >
        </div>

        <div class="toggle">
          <span>${c(e,"editor_freshness")}</span>
          <input
            data-field="show_freshness"
            type="checkbox"
            ${t.show_freshness!==!1?"checked":""}
          >
        </div>

        <div class="toggle">
          <span>${c(e,"editor_fallbacks")}</span>
          <input
            data-field="use_fallbacks"
            type="checkbox"
            ${t.use_fallbacks!==!1?"checked":""}
          >
        </div>

        <div class="cols">
          <div class="row">
            <label>${c(e,"editor_fallback1")} \xB7 weather</label>
            ${this._picker("fallback_weather_1",t.fallback_weather_1)}
          </div>

          <div class="row">
            <label>${c(e,"editor_fallback2")} \xB7 weather</label>
            ${this._picker("fallback_weather_2",t.fallback_weather_2)}
          </div>
        </div>

        <details>
          <summary>${c(e,"editor_advanced")}</summary>
          <div class="hint">${c(e,"editor_hint")}</div>
          ${i}
        </details>
      </div>
    `,this._rendered=!0,this._syncPickers()}};var L="weather-central-card",Z="weather-central-card-editor",ve="2026.11.0b2";customElements.get(Z)||customElements.define(Z,D);customElements.get(L)||customElements.define(L,W);window.customCards=window.customCards||[];window.customCards.some(n=>n.type===L)||window.customCards.push({type:L,name:"Weather Central Card",description:"Provider-aware weather card with source provenance, fallback chains and freshness indicators.",preview:!0});console.info("%c WEATHER-CENTRAL-CARD %c "+ve+" ","color:white;background:#1976d2;font-weight:700","color:#1976d2;background:#fff");})();
