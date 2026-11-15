/* HA-WeatherCentral-Card · generated bundle · MIT */
(()=>{var he=new Set(["unknown","unavailable","none","null",""]),G=["temperature","apparent_temperature","humidity","cloud_coverage","dew_point","precipitation","wind_speed","wind_gust","wind_bearing","pressure","visibility"],z={temperature:{icon:"mdi:thermometer",unit:"\xB0C",decimals:1},apparent_temperature:{icon:"mdi:thermometer-lines",unit:"\xB0C",decimals:1},humidity:{icon:"mdi:water-percent",unit:"%",decimals:0},cloud_coverage:{icon:"mdi:weather-cloudy",unit:"%",decimals:0},dew_point:{icon:"mdi:water-thermometer-outline",unit:"\xB0C",decimals:1},precipitation:{icon:"mdi:weather-rainy",unit:"mm",decimals:1},wind_speed:{icon:"mdi:weather-windy",unit:"m/s",decimals:1},wind_gust:{icon:"mdi:weather-windy-variant",unit:"m/s",decimals:1},wind_bearing:{icon:"mdi:compass-outline",unit:"\xB0",decimals:0},pressure:{icon:"mdi:gauge",unit:"mbar",decimals:0},visibility:{icon:"mdi:eye-outline",unit:"km",decimals:1}},J={temperature:["temperature"],apparent_temperature:["apparent_temperature"],humidity:["humidity"],cloud_coverage:["cloud_coverage"],dew_point:["dew_point"],precipitation:["precipitation"],wind_speed:["wind_speed"],wind_gust:["wind_gust_speed","wind_gust"],wind_bearing:["wind_bearing"],pressure:["pressure"],visibility:["visibility"]};function K(r){let e=Number(r);return Number.isFinite(e)?e:null}function k(r){return!!(r&&!he.has(String(r.state??"").toLowerCase()))}function D(r){let e=r?.last_reported||r?.last_updated||r?.last_changed;if(!e)return null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function b(r,e,t){let i=K(e);if(i===null)return null;let s=String(t||"").trim().toLowerCase();return["temperature","apparent_temperature","dew_point"].includes(r)?["\xB0f","f","fahrenheit"].includes(s)?(i-32)*5/9:i:["wind_speed","wind_gust"].includes(r)?["km/h","kmh","kph"].includes(s)?i/3.6:s==="mph"?i*.44704:["kn","kt","knot","knots"].includes(s)?i*.514444:i:r==="pressure"?s==="pa"?i/100:s==="kpa"?i*10:i:r==="visibility"?s==="m"?i/1e3:["mi","mile","miles"].includes(s)?i*1.609344:i:r==="precipitation"&&["in","inch","inches"].includes(s)?i*25.4:i}function R(r,e){let t=r?.attributes||{};return["temperature","apparent_temperature","dew_point"].includes(e)?t.temperature_unit||"\xB0C":["wind_speed","wind_gust"].includes(e)?t.wind_speed_unit||"m/s":e==="pressure"?t.pressure_unit||"hPa":e==="visibility"?t.visibility_unit||"km":["humidity","cloud_coverage"].includes(e)?"%":e==="wind_bearing"?"\xB0":e==="precipitation"?t.precipitation_unit||"mm":null}function N(r,e=1){return Number.isFinite(r)?r.toLocaleString("sv-SE",{minimumFractionDigits:e,maximumFractionDigits:e}):"\u2013"}function X(r,e="sv"){return Number.isFinite(r)?(e==="sv"?["N","N\xD6","\xD6","S\xD6","S","SV","V","NV"]:["N","NE","E","SE","S","SW","W","NW"])[Math.round((r%360+360)%360/45)%8]:"\u2013"}var Y={subtitle:"V\xE4der\xF6versikt",temperature:"Temperatur",apparent_temperature:"K\xE4nns som",humidity:"Fukt",cloud_coverage:"Moln",dew_point:"Daggpunkt",precipitation:"Nederb\xF6rd",wind_speed:"Vind",wind_gust:"Vindby",wind_bearing:"Riktning",pressure:"Lufttryck",visibility:"Sikt",no_data:"Ingen anv\xE4ndbar data",view_overview:"\xD6versikt",view_temperature:"Temperatur 12 h",view_precipitation:"Nederb\xF6rd 12 h",view_forecast:"7-dygnsprognos",view_wind:"Vind & luft",view_pressure:"Lufttryck",view_diagnostics:"Diagnostik",next_12_hours:"Kommande 12 timmar",today_plus_6:"Idag + 6 dagar",precipitation_probability:"Regnrisk",high:"H\xF6gst",low:"L\xE4gst",editor_weather:"V\xE4derk\xE4lla",editor_view:"Vy",editor_sources:"Visa k\xE4llor",editor_freshness:"Visa freshness",editor_fallbacks:"Anv\xE4nd fallback",editor_advanced:"Avancerade datak\xE4llor",editor_primary:"Prim\xE4r entity",editor_fallback1:"Fallback 1",editor_fallback2:"Fallback 2",editor_hint:"Tomma f\xE4lt anv\xE4nder providerprofilen och d\xE4refter weather-entitetens kompatibla attribut.",fresh:"F\xE4rsk",aging:"\xC5ldrande",stale:"F\xF6r gammal",unknown:"Freshness ok\xE4nd","clear-night":"Klart",cloudy:"Mulet",fog:"Dimma",hail:"Hagel",lightning:"\xC5ska","lightning-rainy":"\xC5ska och regn",partlycloudy:"Delvis molnigt",pouring:"Skyfall",rainy:"Regn",snowy:"Sn\xF6","snowy-rainy":"Sn\xF6blandat regn",sunny:"Soligt",windy:"Bl\xE5sigt","windy-variant":"Bl\xE5sigt",data_coverage:"Datat\xE4ckning",missing:"Saknas",view_sky:"Himmel",view_risks:"Risker",view_alerts:"Varningar",view_air_quality:"Luftkvalitet",view_comparison:"J\xE4mf\xF6relse",sun:"Solen",sun_up:"Uppe",sun_down:"Nere",sunset:"Solnedg\xE5ng",sunrise:"Soluppg\xE5ng",moon:"M\xE5nen",moon_phase:"Aktuell m\xE5nfas",aurora:"Norrsken",uv_low:"L\xE5gt",uv_moderate:"M\xE5ttligt",uv_high:"H\xF6gt",uv_very_high:"Mycket h\xF6gt",uv_extreme:"Extremt",aurora_very_low:"Mycket l\xE5g chans",aurora_low:"L\xE5g chans",aurora_possible:"M\xF6jligt",aurora_good:"Bra chans",aurora_very_good:"Mycket bra chans",moon_new:"Nym\xE5ne",moon_waxing_crescent:"Tilltagande sk\xE4ra",moon_first_quarter:"F\xF6rsta kvarteret",moon_waxing_gibbous:"Tilltagande m\xE5ne",moon_full:"Fullm\xE5ne",moon_waning_gibbous:"Avtagande m\xE5ne",moon_last_quarter:"Sista kvarteret",moon_waning_crescent:"Avtagande sk\xE4ra",risk_none:"Ingen risk",risk_low:"L\xE5g risk",risk_elevated:"F\xF6rh\xF6jd risk",risk_high:"H\xF6g risk",frost_ice:"Frost & halka",minimum:"Minimum",thunder:"\xC5ska",fire_risk:"Brandrisk",risk_relevant:"Relevant",risk_not_relevant:"Ej relevant",index:"Index",message:"Meddelande",smhi_message:"SMHI-meddelande",no_active_alerts:"Inga aktiva varningar eller meddelanden",warnings:"varningar",messages:"meddelanden",aqi_good:"Bra",aqi_moderate:"M\xE5ttlig",aqi_sensitive:"Oh\xE4lsosam f\xF6r k\xE4nsliga",aqi_unhealthy:"Oh\xE4lsosam",aqi_very_unhealthy:"Mycket oh\xE4lsosam",aqi_hazardous:"Farlig",dominant_pollutant:"Dominerande f\xF6rorening",consensus_temperature:"Consensus temperatur",consensus_wind:"Consensus vind",source:"K\xE4lla",editor_extra_sources:"Extra integrationer",editor_extra_hint:"Autodetekterade v\xE4rden anv\xE4nds om f\xE4ltet \xE4r tomt. V\xE4lj annan entity f\xF6r att ers\xE4tta en k\xE4lla.",editor_sun:"Sol",editor_moon:"M\xE5nfas",editor_uv:"UV-index",editor_aurora:"Norrsken",editor_frost:"Frost/halkrisk",editor_fire:"Brandrisk",editor_thunder:"\xC5skrisk",editor_alerts_status:"SMHI varningsstatus",editor_alerts:"SMHI varningsmeddelanden",editor_aqi:"AQI",editor_dominant:"Dominerande f\xF6rorening",editor_ozone:"Ozon",editor_no2:"Kv\xE4vedioxid",editor_pm25:"PM2.5",editor_pm10:"PM10",editor_dynamic_backgrounds:"Dynamisk bakgrund",calculated:"Ber\xE4knad",precipitation_hour:"Nederb\xF6rd 1 h",precipitation_now:"Regn nu",updated:"Uppdaterad",editor_overview:"\xD6versikt",editor_overview_hint:"V\xE4lj vilka fyra detaljrutor som ska visas i standardkortet. Daggpunkt kan ber\xE4knas fr\xE5n temperatur och fukt om direkt k\xE4lla saknas.",editor_overview_metric:"Detaljruta",editor_summary_entity:"Sammanfattning (valfri entity)"};var Z={subtitle:"Weather overview",temperature:"Temperature",apparent_temperature:"Feels like",humidity:"Humidity",cloud_coverage:"Clouds",dew_point:"Dew point",precipitation:"Precipitation",wind_speed:"Wind",wind_gust:"Wind gust",wind_bearing:"Direction",pressure:"Pressure",visibility:"Visibility",no_data:"No usable data",view_overview:"Overview",view_temperature:"Temperature 12 h",view_precipitation:"Precipitation 12 h",view_forecast:"7-day forecast",view_wind:"Wind & air",view_pressure:"Pressure",view_diagnostics:"Diagnostics",next_12_hours:"Next 12 hours",today_plus_6:"Today + 6 days",precipitation_probability:"Rain chance",high:"High",low:"Low",editor_weather:"Weather source",editor_view:"View",editor_sources:"Show sources",editor_freshness:"Show freshness",editor_fallbacks:"Use fallbacks",editor_advanced:"Advanced data sources",editor_primary:"Primary entity",editor_fallback1:"Fallback 1",editor_fallback2:"Fallback 2",editor_hint:"Empty fields use the provider profile and then compatible weather-entity attributes.",fresh:"Fresh",aging:"Aging",stale:"Stale",unknown:"Freshness unknown","clear-night":"Clear",cloudy:"Cloudy",fog:"Fog",hail:"Hail",lightning:"Lightning","lightning-rainy":"Lightning and rain",partlycloudy:"Partly cloudy",pouring:"Pouring",rainy:"Rain",snowy:"Snow","snowy-rainy":"Sleet",sunny:"Sunny",windy:"Windy","windy-variant":"Windy",data_coverage:"Data coverage",missing:"Missing",view_sky:"Sky",view_risks:"Risks",view_alerts:"Alerts",view_air_quality:"Air quality",view_comparison:"Comparison",sun:"Sun",sun_up:"Up",sun_down:"Down",sunset:"Sunset",sunrise:"Sunrise",moon:"Moon",moon_phase:"Current moon phase",aurora:"Aurora",uv_low:"Low",uv_moderate:"Moderate",uv_high:"High",uv_very_high:"Very high",uv_extreme:"Extreme",aurora_very_low:"Very low chance",aurora_low:"Low chance",aurora_possible:"Possible",aurora_good:"Good chance",aurora_very_good:"Very good chance",moon_new:"New moon",moon_waxing_crescent:"Waxing crescent",moon_first_quarter:"First quarter",moon_waxing_gibbous:"Waxing gibbous",moon_full:"Full moon",moon_waning_gibbous:"Waning gibbous",moon_last_quarter:"Last quarter",moon_waning_crescent:"Waning crescent",risk_none:"No risk",risk_low:"Low risk",risk_elevated:"Elevated risk",risk_high:"High risk",frost_ice:"Frost & ice",minimum:"Minimum",thunder:"Thunder",fire_risk:"Fire risk",risk_relevant:"Relevant",risk_not_relevant:"Not relevant",index:"Index",message:"Message",smhi_message:"SMHI message",no_active_alerts:"No active warnings or messages",warnings:"warnings",messages:"messages",aqi_good:"Good",aqi_moderate:"Moderate",aqi_sensitive:"Unhealthy for sensitive groups",aqi_unhealthy:"Unhealthy",aqi_very_unhealthy:"Very unhealthy",aqi_hazardous:"Hazardous",dominant_pollutant:"Dominant pollutant",consensus_temperature:"Consensus temperature",consensus_wind:"Consensus wind",source:"Source",editor_extra_sources:"Extra integrations",editor_extra_hint:"Auto-detected values are used when a field is empty. Select another entity to override a source.",editor_sun:"Sun",editor_moon:"Moon phase",editor_uv:"UV index",editor_aurora:"Aurora",editor_frost:"Frost/ice risk",editor_fire:"Fire risk",editor_thunder:"Thunder risk",editor_alerts_status:"SMHI alert status",editor_alerts:"SMHI alert messages",editor_aqi:"AQI",editor_dominant:"Dominant pollutant",editor_ozone:"Ozone",editor_no2:"Nitrogen dioxide",editor_pm25:"PM2.5",editor_pm10:"PM10",editor_dynamic_backgrounds:"Dynamic background",calculated:"Calculated",precipitation_hour:"Precipitation 1 h",precipitation_now:"Rain now",updated:"Updated",editor_overview:"Overview",editor_overview_hint:"Choose the four detail tiles shown in the standard card. Dew point can be calculated from temperature and humidity when no direct source exists.",editor_overview_metric:"Detail tile",editor_summary_entity:"Summary (optional entity)"};var ee={sv:Y,en:Z};function T(r){return String(r?.language||r?.locale?.language||"en").toLowerCase().startsWith("sv")?"sv":"en"}function a(r,e){return ee[r]?.[e]||ee.en[e]||e}var te=[{id:"smhi_local",label:"SMHI Local",matchWeather:r=>r==="weather.smhi_local"||String(r||"").includes("smhi_local"),entities:{temperature:"sensor.smhi_local_temperatur",apparent_temperature:"sensor.smhi_local_kanns_som",humidity:"sensor.smhi_local_luftfuktighet",cloud_coverage:"sensor.smhi_local_molnmangd",wind_speed:"sensor.smhi_local_vindhastighet",wind_gust:"sensor.smhi_local_vindby",pressure:"sensor.smhi_local_lufttryck",visibility:"sensor.smhi_local_sikt"},forecastFreshnessEntity:"sensor.smhi_local_prognos_skapad",freshness:{greenMinutes:20,yellowMinutes:90},forecastFreshness:{greenMinutes:180,yellowMinutes:360}},{id:"smhi_core",label:"SMHI Core",matchWeather:r=>r==="weather.smhi"||/weather\.smhi($|_)/i.test(String(r||"")),entities:{},freshness:{greenMinutes:45,yellowMinutes:150}},{id:"pirateweather",label:"Pirate Weather",matchWeather:r=>r==="weather.pirateweather"||String(r||"").includes("pirateweather"),entities:{apparent_temperature:"sensor.pirateweather_apparent_temperature",humidity:"sensor.pirateweather_humidity",cloud_coverage:"sensor.pirateweather_cloud_coverage",dew_point:"sensor.pirateweather_dew_point",precipitation:"sensor.pirateweather_precip_intensity",wind_gust:"sensor.pirateweather_wind_gust",wind_bearing:"sensor.pirateweather_wind_bearing",pressure:"sensor.pirateweather_pressure",visibility:"sensor.pirateweather_visibility"},freshness:{greenMinutes:35,yellowMinutes:120}},{id:"met",label:"MET Norway",matchWeather:r=>/forecast_home|met_no|met\.no|met_norway/i.test(String(r||"")),entities:{},freshness:{greenMinutes:35,yellowMinutes:120}},{id:"open_meteo",label:"Open-Meteo",matchWeather:r=>/open.?meteo|weather\.garaget/i.test(String(r||"")),entities:{},freshness:{greenMinutes:45,yellowMinutes:150}},{id:"owm",label:"OpenWeatherMap",matchWeather:r=>/openweathermap|owm/i.test(String(r||"")),entities:{},freshness:{greenMinutes:45,yellowMinutes:150}}];function q(r){return te.find(e=>e.matchWeather(r))||null}function C(r,e){if(!r)return{id:"unknown",label:"Unknown",entities:{}};if(/vaderkonsensus|weather_consensus|weather.*consensus/i.test(r))return{id:"consensus",label:"Weather Consensus",entities:{}};for(let i of te)if(i.matchWeather(r)||Object.values(i.entities||{}).includes(r))return i;return{id:"custom",label:e?.states?.[r]?.attributes?.friendly_name||r,entities:{},freshness:{greenMinutes:45,yellowMinutes:120}}}function fe(r,e){let t=r?.states?.[e];if(!k(t))return null;let i=Date.parse(t.state);return Number.isFinite(i)?i:D(t)}function we(r,e,t,i=!1){let s=i?t?.forecastFreshness||{greenMinutes:180,yellowMinutes:360}:t?.freshness||{greenMinutes:45,yellowMinutes:120},o=null;if(i&&t?.forecastFreshnessEntity&&(o=fe(r,t.forecastFreshnessEntity)),!o&&e&&(o=D(r?.states?.[e])),!o)return{status:"unknown",ageMinutes:null,timestamp:null};let n=Math.max(0,(Date.now()-o)/6e4);return n<=s.greenMinutes?{status:"fresh",ageMinutes:n,timestamp:o}:n<=s.yellowMinutes?{status:"aging",ageMinutes:n,timestamp:o}:{status:"stale",ageMinutes:n,timestamp:o}}function ge(r,e,t){let i=r?.states?.[e];if(!k(i))return null;for(let s of J[t]||[]){let o=i.attributes?.[s];if(o==null)continue;let n=b(t,o,R(i,t));if(n!==null)return{value:n,entityId:e,weatherAttribute:s,sourceUnit:R(i,t)}}return null}function ye(r,e,t){if(!e)return null;if(e.startsWith("weather."))return ge(r,e,t);let i=r?.states?.[e];if(!k(i))return null;let s=b(t,i.state,i.attributes?.unit_of_measurement);return s===null?null:{value:s,entityId:e,sourceUnit:i.attributes?.unit_of_measurement||null}}var O=class{constructor(e,t){this.hass=e,this.config=t||{},this.selectedSources=new Map,this.freshSince=new Map}update(e,t){this.hass=e,this.config=t||{}}baseProvider(){return q(this.config.weather_entity)||{id:"generic",label:this.hass?.states?.[this.config.weather_entity]?.attributes?.friendly_name||"Weather",entities:{},freshness:{greenMinutes:45,yellowMinutes:120}}}parameterConfig(e){let t=this.config.parameters?.[e]||{};return{primary:t.primary||null,fallbacks:Array.isArray(t.fallbacks)?t.fallbacks.filter(Boolean):[]}}candidates(e){let t=this.baseProvider(),i=this.parameterConfig(e),s=[],o=(n,l,d=!1)=>{n&&(s.some(u=>u.entityId===n)||s.push({entityId:n,role:l,useForecastClock:d}))};if(i.primary&&(o(i.primary,"manual-primary"),this.config.use_fallbacks!==!1))for(let n of i.fallbacks)o(n,"manual-fallback");if(o(t.entities?.[e],"provider",t.id==="smhi_local"),o(this.config.weather_entity,"base-weather",t.id==="smhi_local"),this.config.use_fallbacks!==!1){if(!i.primary)for(let n of i.fallbacks)o(n,"manual-fallback");o(this.config.fallback_weather_1,"fallback-weather"),o(this.config.fallback_weather_2,"fallback-weather")}return s}resolveCandidate(e,t,i){let s=ye(this.hass,t.entityId,e);if(!s)return null;let o=C(t.entityId,this.hass);o.id==="custom"&&t.entityId===this.config.weather_entity&&(o=this.baseProvider());let n=we(this.hass,t.entityId,o,t.useForecastClock&&o.id==="smhi_local");return{param:e,value:s.value,entityId:t.entityId,source:o.label,sourceId:o.id,role:t.role,fallbackLevel:i,freshness:n,sourceUnit:s.sourceUnit||null,stale:n.status==="stale"}}trackFresh(e,t){if(!t)return;let i=`${e}:${t.entityId}`;t.freshness.status==="fresh"?this.freshSince.has(i)||this.freshSince.set(i,Date.now()):this.freshSince.delete(i)}resolve(e){let t=this.candidates(e).map((l,d)=>this.resolveCandidate(e,l,d)).filter(Boolean);for(let l of t)this.trackFresh(e,l);if(!t.length)return null;let s=t.filter(l=>!l.stale)[0]||t[0],o=this.selectedSources.get(e),n=t.find(l=>l.entityId===o);if(n&&!n.stale&&s.entityId!==n.entityId&&s.fallbackLevel<n.fallbackLevel){let l=`${e}:${s.entityId}`,d=this.freshSince.get(l)||Date.now(),u=Math.max(0,Number(this.config.recovery_grace_seconds??120))*1e3;Date.now()-d<u&&(s=n)}return this.selectedSources.set(e,s.entityId),s}};function be(r,e){let t=r?.states?.[e];if(!t)return null;let i=Date.parse(t.state);return Number.isFinite(i)?i:D(t)}function xe(r,e,t,i){let s=t?.forecastFreshness||{greenMinutes:90,yellowMinutes:240},o=null;if(t?.forecastFreshnessEntity&&(o=be(r,t.forecastFreshnessEntity)),o||(o=i||null),!o)return{status:"unknown",ageMinutes:null,timestamp:null};let n=Math.max(0,(Date.now()-o)/6e4);return n<=s.greenMinutes?{status:"fresh",ageMinutes:n,timestamp:o}:n<=s.yellowMinutes?{status:"aging",ageMinutes:n,timestamp:o}:{status:"stale",ageMinutes:n,timestamp:o}}function ke(r,e,t){if(!t||!t.datetime)return null;let s=r?.states?.[e]?.attributes||{},o=s.temperature_unit||"\xB0C",n=s.wind_speed_unit||"m/s",l=s.pressure_unit||"hPa",d=s.precipitation_unit||"mm",u=x=>{let F=K(t[x]);return F===null?null:F},p=t.temperature==null?null:b("temperature",t.temperature,o),m=t.templow==null?null:b("temperature",t.templow,o),_=t.apparent_temperature==null?null:b("apparent_temperature",t.apparent_temperature,o),h=t.dew_point==null?null:b("dew_point",t.dew_point,o),v=t.precipitation==null?null:b("precipitation",t.precipitation,d),g=t.pressure==null?null:b("pressure",t.pressure,l),y=t.wind_speed==null?null:b("wind_speed",t.wind_speed,n),E=t.wind_gust_speed==null?null:b("wind_gust",t.wind_gust_speed,n);return{datetime:t.datetime,condition:t.condition||null,is_daytime:typeof t.is_daytime=="boolean"?t.is_daytime:null,temperature:p,templow:m,apparent_temperature:_,dew_point:h,precipitation:v,precipitation_probability:u("precipitation_probability"),humidity:u("humidity"),cloud_coverage:u("cloud_coverage"),pressure:g,wind_bearing:t.wind_bearing??null,wind_speed:y,wind_gust_speed:E}}function $e(r){let e=r.filter(i=>Array.isArray(i?.forecast)&&i.forecast.length>0);return e.length?e.find(i=>i.freshness?.status!=="stale")||e[0]:null}var P=class{constructor(e){this.onChange=e,this.hass=null,this.config={},this.connection=null,this.subscriptions=new Map,this.series=new Map}update(e,t){this.connection&&e?.connection&&this.connection!==e.connection&&this.disconnect(),this.hass=e,this.config=t||{},this.connection=e?.connection||null}entities(){let e=[],t=i=>{i&&i.startsWith("weather.")&&!e.includes(i)&&e.push(i)};return t(this.config.weather_entity),this.config.use_fallbacks!==!1&&(t(this.config.fallback_weather_1),t(this.config.fallback_weather_2)),e}ensure(e){this._ensure(e).catch(t=>{console.warn("Weather Central forecast subscription failed",e,t)})}async _ensure(e){if(!this.connection)return;let t=new Set(this.entities().map(i=>`${i}|${e}`));for(let[i,s]of this.subscriptions)if(i.endsWith(`|${e}`)&&!t.has(i)){this.subscriptions.delete(i);try{(await s.unsubscribePromise)?.()}catch{}}for(let i of this.entities()){let s=`${i}|${e}`;if(this.subscriptions.has(s))continue;let o=this.connection.subscribeMessage(n=>{let l=Array.isArray(n?.forecast)?n.forecast.map(d=>ke(this.hass,i,d)).filter(Boolean):[];this.series.set(s,{entityId:i,type:e,forecast:l,receivedAt:Date.now()}),this.onChange?.()},{type:"weather/subscribe_forecast",forecast_type:e,entity_id:i});this.subscriptions.set(s,{entityId:i,type:e,unsubscribePromise:o})}}get(e){let t=this.entities().map((i,s)=>{let o=`${i}|${e}`,n=this.series.get(o);if(!n)return null;let l=C(i,this.hass);return{...n,source:l.label,sourceId:l.id,fallbackLevel:s,freshness:xe(this.hass,i,l,n.receivedAt)}}).filter(Boolean);return $e(t)}disconnect(){let e=[...this.subscriptions.values()];this.subscriptions.clear(),this.series.clear();for(let t of e)Promise.resolve(t.unsubscribePromise).then(i=>i?.()).catch(()=>{})}};var Q={sun_entity:"sun.sun",moon_entity:"sensor.moon_phase",uv_entity:"sensor.openuv_aktuellt_uv_index",aurora_entity:"sensor.aurora_59_18",frost_risk_entity:"binary_sensor.frost_halka_relevant",fire_risk_entity:"binary_sensor.brandrisk_relevant",thunder_risk_entity:"sensor.smhi_local_askrisk_nu",alerts_status_entity:"binary_sensor.smhi_alerts_active_stockholms_lan",alerts_entity:"sensor.smhi_alerts_stockholms_lan",aqi_entity:"sensor.stockholm_sodermalm_sweden_luftkvalitetsindex",dominant_pollutant_entity:"sensor.stockholm_sodermalm_sweden_dominerande_fororening",ozone_entity:"sensor.stockholm_sodermalm_sweden_ozon",no2_entity:"sensor.stockholm_sodermalm_sweden_kvavedioxid",pm25_entity:"sensor.stockholm_sodermalm_sweden_pm25",pm10_entity:"sensor.stockholm_sodermalm_sweden_pm10"},Me={sun_entity:"Home Assistant Sun",moon_entity:"Home Assistant Moon",uv_entity:"OpenUV",aurora_entity:"Aurora",frost_risk_entity:"Weather Central",fire_risk_entity:"Brandrisk",thunder_risk_entity:"SMHI Local",alerts_status_entity:"SMHI",alerts_entity:"SMHI",aqi_entity:"Luftkvalitet",dominant_pollutant_entity:"Luftkvalitet",ozone_entity:"Luftkvalitet",no2_entity:"Luftkvalitet",pm25_entity:"Luftkvalitet",pm10_entity:"Luftkvalitet"};function S(r,e,t){let i=e?.extras?.[t]||e?.[t];if(i)return i;let s=Q[t];return s&&r?.states?.[s]?s:null}function A(r,e,t){let i=S(r,e,t);if(!i)return"";let s=C(i,r);return s&&!["custom","unknown"].includes(s.id)?s.label:Me[t]||r?.states?.[i]?.attributes?.friendly_name||i}function M(r,e){let t=r?.states?.[e];if(!k(t))return null;let i=Number(t.state);return Number.isFinite(i)?i:null}function Se(r,e){let t=r?.states?.[e];return k(t)?String(t.state):null}function $(r,e,t=45,i=180){let s=r?.states?.[e];if(!s)return{status:"unknown",ageMinutes:null};let o=s.last_reported||s.last_updated||s.last_changed,n=Date.parse(o||"");if(!Number.isFinite(n))return{status:"unknown",ageMinutes:null};let l=Math.max(0,(Date.now()-n)/6e4);return l<=t?{status:"fresh",ageMinutes:l}:l<=i?{status:"aging",ageMinutes:l}:{status:"stale",ageMinutes:l}}function re(r,e){let t=S(r,e,"sun_entity"),i=S(r,e,"moon_entity"),s=S(r,e,"uv_entity"),o=S(r,e,"aurora_entity"),n=r?.states?.[t]||null,l=r?.states?.[i]||null;return{sun:n?{entityId:t,state:n.state,elevation:Number.isFinite(Number(n.attributes?.elevation))?Number(n.attributes.elevation):null,nextRising:n.attributes?.next_rising||null,nextSetting:n.attributes?.next_setting||null,source:A(r,e,"sun_entity"),freshness:$(r,t,180,720)}:null,moon:l?{entityId:i,phase:l.state,source:A(r,e,"moon_entity"),freshness:$(r,i,720,2880)}:null,uv:s?{entityId:s,value:M(r,s),source:A(r,e,"uv_entity"),freshness:$(r,s,90,240)}:null,aurora:o?{entityId:o,value:M(r,o),source:A(r,e,"aurora_entity"),freshness:$(r,o,90,240)}:null}}function Fe(r){let e=r?.forecast||[],t=0,i=null,s=null;return e.slice(0,12).forEach((o,n)=>{let l=Number(o.temperature);if(!Number.isFinite(l))return;s=s===null?l:Math.min(s,l);let d=Number.isFinite(o.precipitation)?o.precipitation:0,u=Number.isFinite(o.humidity)?o.humidity:null,p=Number.isFinite(o.dew_point)?o.dew_point:null,m=p===null?null:l-p,_=0,h="";l<=.5&&d>0?(_=3,h="precip_freezing"):l<=0?(_=2,h="below_zero"):l<=2&&(u!==null&&u>=90||m!==null&&m<=1.5)&&(_=1,h="cold_humid"),_>t&&(t=_),!i&&_>0&&(i={index:n,datetime:o.datetime,level:_,reason:h})}),{available:e.slice(0,12).some(o=>Number.isFinite(Number(o.temperature))),level:t,first:i,minTemp:s}}function se(r,e,t){let i=S(r,e,"frost_risk_entity"),s=S(r,e,"fire_risk_entity"),o=S(r,e,"thunder_risk_entity"),n=Fe(t),l=i?r.states[i]:null,d=k(l);!n.available&&d?(n.available=!0,n.level=l.state==="on"?1:0):n.available&&d&&l.state==="on"&&n.level===0&&(n.level=1);let u=s?r.states[s]:null,p=u&&Number.isFinite(Number(u.attributes?.max_index_12h))?Number(u.attributes.max_index_12h):M(r,s),m=k(u)||Number.isFinite(p),_=m&&(u?.state==="on"||Number.isFinite(p)&&p>=10),h=M(r,o),v=(t?.forecast||[]).slice(0,12),g=v.some(x=>!!x.condition),y=v.some(x=>["lightning","lightning-rainy"].includes(x.condition));!Number.isFinite(h)&&y&&(h=100);let E=Number.isFinite(h)||g;return{frost:{...n,entityId:i,source:n.available&&t?.forecast?.length?t.source||"":d?A(r,e,"frost_risk_entity"):"",freshness:n.available&&t?.forecast?.length?t.freshness||{status:"unknown"}:d?$(r,i,45,180):{status:"unknown"}},fire:{entityId:s,available:m,active:_,index:Number.isFinite(p)?p:null,source:s?A(r,e,"fire_risk_entity"):"",freshness:s?$(r,s,60,240):{status:"unknown"}},thunder:{entityId:o,available:E,value:Number.isFinite(h)?h:null,active:Number.isFinite(h)?h>0:y,source:o?A(r,e,"thunder_risk_entity"):t?.source||"",freshness:o?$(r,o,60,240):t?.freshness||{status:"unknown"}}}}function ne(r,e){let t=S(r,e,"alerts_status_entity"),i=S(r,e,"alerts_entity"),s=r?.states?.[t]||null,o=r?.states?.[i]||null,n=Array.isArray(o?.attributes?.messages)?o.attributes.messages:[];return{available:k(s)||k(o),statusEntity:t,alertsEntity:i,warnings:Number(s?.attributes?.warnings_count)||0,messagesCount:Number(s?.attributes?.messages_count)||n.length||0,alertsCount:Number(s?.attributes?.alerts_count)||n.length||0,severity:String(s?.attributes?.highest_severity||"").toUpperCase(),lastUpdate:s?.attributes?.last_update_local||s?.attributes?.last_update||null,messages:n,source:"SMHI",freshness:t?$(r,t,60,240):{status:"unknown"}}}function oe(r,e){let i=Object.fromEntries(Object.entries({aqi:"aqi_entity",dominant:"dominant_pollutant_entity",o3:"ozone_entity",no2:"no2_entity",pm25:"pm25_entity",pm10:"pm10_entity"}).map(([o,n])=>[o,S(r,e,n)])),s=i.aqi?String(r?.states?.[i.aqi]?.attributes?.friendly_name||"").replace(/luftkvalitetsindex/ig,"").replace(/s+/g," ").trim():"";return{entities:i,station:s,aqi:M(r,i.aqi),dominant:Se(r,i.dominant),o3:M(r,i.o3),no2:M(r,i.no2),pm25:M(r,i.pm25),pm10:M(r,i.pm10),source:i.aqi?A(r,e,"aqi_entity"):"",freshness:i.aqi?$(r,i.aqi,90,360):{status:"unknown"}}}function Ne(r){let e=String(r||"").toLowerCase();return{temperature:"temperature",humidity:"humidity",wind_speed:"wind_speed",wind_gust_speed:"wind_gust",wind_gust:"wind_gust",pressure:"pressure",cloud_coverage:"cloud_coverage"}[e]||null}function Ee(r){let e=new Map;for(let[t,i]of Object.entries(r?.states||{})){if(!t.startsWith("sensor."))continue;let s=i?.attributes||{},o=s.source,n=Ne(s.parameter);if(!o||!n)continue;let l=String(s.friendly_name||"").toLowerCase();if(!(l.includes("v\xE4derj\xE4mf\xF6relse v2")||l.includes("vaderjamforelse v2")||String(s.implementation||"").length>0||String(s.model_family||"").length>0))continue;let u=Number(i.state);if(!Number.isFinite(u))continue;let p=String(o);e.has(p)||e.set(p,{source:p,sourceId:p.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,""),modelFamily:s.model_family||null,implementation:s.implementation||null,entities:{},values:{},freshness:{status:"unknown",ageMinutes:null}});let m=e.get(p);m.entities[n]=t,m.values[n]=u;let _=s.sampled_at||s.source_last_updated||i.last_reported||i.last_updated||i.last_changed,h=Date.parse(_||"");if(Number.isFinite(h)){let v=Math.max(0,(Date.now()-h)/6e4),g=v<=30?"fresh":v<=120?"aging":"stale",y={unknown:0,fresh:1,aging:2,stale:3};y[g]>y[m.freshness.status]?m.freshness={status:g,ageMinutes:v}:(m.freshness.ageMinutes===null||v>m.freshness.ageMinutes)&&(m.freshness.ageMinutes=v)}}return[...e.values()]}function Ie(r,e,t){let i=r?.states?.[e];if(!k(i))return null;let s=t==="wind_gust"?i.attributes?.wind_gust_speed??i.attributes?.wind_gust:i.attributes?.[t];return s==null?null:b(t,s,R(i,t))}function Ae(r,e){let t=[],i=s=>{s&&r?.states?.[s]&&s.startsWith("weather.")&&!t.includes(s)&&t.push(s)};return i(e?.weather_entity),i(e?.fallback_weather_1),i(e?.fallback_weather_2),Object.keys(r?.states||{}).filter(s=>s.startsWith("weather.")).filter(s=>q(s)).forEach(i),t.slice(0,6)}function ie(r,e){let t=e==="temperature"?["vaderkonsensus_temperatur","weather_consensus_temperature"]:["vaderkonsensus_vind","weather_consensus_wind"];return Object.keys(r?.states||{}).find(i=>{let s=String(r.states[i]?.attributes?.friendly_name||"").toLowerCase().replaceAll("\xE4","a"),o=i.toLowerCase().replaceAll("\xE4","a");return t.some(n=>o.includes(n)||s.includes(n.replaceAll("_"," ")))})||null}function ae(r,e){let t=["temperature","humidity","wind_speed","wind_gust","pressure","cloud_coverage"],i=Ee(r).map(d=>({entityId:d.entities.temperature||d.entities.wind_speed||Object.values(d.entities)[0]||null,source:d.source,sourceId:d.sourceId,modelFamily:d.modelFamily,implementation:d.implementation,freshness:d.freshness,values:Object.fromEntries(t.map(u=>[u,Number.isFinite(d.values[u])?d.values[u]:null]))})),s=[...i],o=new Set(i.map(d=>d.source.toLowerCase()));for(let d of Ae(r,e)){let u=q(d)||{id:"generic",label:r.states[d]?.attributes?.friendly_name||d};o.has(String(u.label).toLowerCase())||s.push({entityId:d,source:u.label,sourceId:u.id,modelFamily:u.id==="smhi_local"||u.id==="smhi_core"?"SMHI snow1g":null,implementation:null,freshness:$(r,d,60,240),values:Object.fromEntries(t.map(p=>[p,Ie(r,d,p)]))})}let n=ie(r,"temperature"),l=ie(r,"wind");return{providers:s,consensus:{temperature:n?{entityId:n,value:M(r,n),freshness:$(r,n,30,120)}:null,wind:l?{entityId:l,value:M(r,l),freshness:$(r,l,30,120)}:null}}}var ce="2026.11.0b8",ze={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},Ce=`
  :host{display:block;min-width:0}
  ha-card{padding:16px;overflow:hidden}
  .top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}
  .heading{display:flex;align-items:center;gap:12px;min-width:0}
  .hero-icon{--mdc-icon-size:70px;color:var(--primary-color)}
  .title{font-size:11px;color:var(--secondary-text-color)}
  .condition{font-size:18px;font-weight:650;line-height:1.2;margin-top:2px}
  .provider{font-size:10px;color:var(--secondary-text-color);white-space:nowrap}
  .overview-hero{display:grid;grid-template-columns:82px minmax(0,1fr) auto;gap:12px;align-items:center;padding:2px 0 10px}
  .overview-info{min-width:0}
  .overview-big{font-size:32px;font-weight:650;line-height:1.05}
  .overview-condition{font-size:18px;font-weight:650;line-height:1.2;margin-top:3px}
  .overview-detail{font-size:12px;color:var(--secondary-text-color);line-height:1.45;margin-top:5px}
  .overview-summary{border-top:1px solid var(--divider-color);padding:10px 0 9px;font-size:12px;line-height:1.45}
  .overview-updated{text-align:right;font-size:10px;color:var(--secondary-text-color);margin-top:6px}
  .main{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:end;margin:2px 0 14px}
  .big{font-size:38px;font-weight:650;line-height:1}
  .secondary{font-size:12px;color:var(--secondary-text-color);margin-top:5px}
  .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .wind-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(105px,1fr));gap:7px}
  .wind-tile{padding:9px 6px 8px;text-align:center;border-radius:11px}
  .wind-tile .tile-head{justify-content:center;gap:5px;font-size:10.5px}
  .wind-tile .tile-head ha-icon{--mdc-icon-size:19px}
  .wind-tile .tile-value{font-size:16px;margin-top:4px}
  .wind-tile .meta{justify-content:center;margin-top:4px}
  .overview-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:6px}
  .tile{padding:11px;border-radius:12px;background:var(--secondary-background-color);min-width:0}
  .overview-tile{padding:9px 5px 8px;border-radius:11px;text-align:center}
  .overview-tile .tile-head{justify-content:center;gap:5px;font-size:10.5px;font-weight:600;color:var(--primary-text-color)}
  .overview-tile .tile-head ha-icon{--mdc-icon-size:19px}
  .overview-tile .tile-value{font-size:13px;margin-top:2px;font-weight:500}
  .overview-tile .meta{justify-content:center;margin-top:4px}
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
  .forecast-days{display:flex;flex-wrap:wrap;justify-content:center;gap:7px}
  .day{flex:0 1 calc(25% - 6px);box-sizing:border-box;padding:10px 5px;border-radius:12px;background:var(--secondary-background-color);text-align:center;min-width:0}
  .day ha-icon{--mdc-icon-size:29px;color:var(--primary-color);margin:7px 0 3px}
  .day-name{font-size:12px;font-weight:650}
  .day-date{font-size:9.5px;color:var(--secondary-text-color);margin-top:1px}
  .day-temp{font-size:16px;font-weight:650;margin-top:5px}
  .day-low{font-size:12px;color:var(--secondary-text-color);font-weight:400;margin-left:3px}
  .series-meta{display:flex;align-items:center;justify-content:flex-end;gap:5px;font-size:9.5px;color:var(--secondary-text-color);margin-top:9px}
  .temp-chart{width:100%;height:auto;display:block;overflow:visible;margin-top:4px}
  .extra-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .extra-tile{padding:12px;border-radius:12px;background:var(--secondary-background-color);min-width:0}
  .extra-title{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--secondary-text-color)}
  .extra-title ha-icon{--mdc-icon-size:20px;color:var(--primary-color)}
  .extra-value{font-size:20px;font-weight:650;margin-top:6px}
  .extra-sub{font-size:10px;color:var(--secondary-text-color);margin-top:4px;line-height:1.35}
  .risk-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
  .risk-card{padding:12px;border-radius:12px;background:var(--secondary-background-color);min-width:0}
  .risk-icon{--mdc-icon-size:25px;margin-bottom:7px}
  .risk-name{font-size:11px;color:var(--secondary-text-color)}
  .risk-state{font-size:17px;font-weight:650;margin-top:4px}
  .alert-list{display:grid;gap:8px}
  .alert-item{display:grid;grid-template-columns:34px minmax(0,1fr);gap:9px;padding:11px;border-radius:12px;background:var(--secondary-background-color);border-left:5px solid var(--divider-color)}
  .alert-item ha-icon{--mdc-icon-size:25px;margin-top:2px}
  .alert-title{font-size:13px;font-weight:650;line-height:1.25}
  .alert-sub{font-size:10px;color:var(--secondary-text-color);line-height:1.35;margin-top:4px}
  .aqi-hero{display:grid;grid-template-columns:105px minmax(0,1fr);gap:14px;align-items:center;padding:14px;border-radius:12px;background:var(--secondary-background-color)}
  .aqi-number{font-size:38px;font-weight:700;text-align:center}
  .pollutants{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px;margin-top:9px}
  .pollutant{padding:10px 4px;border-radius:11px;background:var(--secondary-background-color);text-align:center}
  .pollutant strong{display:block;font-size:15px;margin-top:4px}
  .comparison-wrap{overflow-x:auto}
  .comparison{width:100%;border-collapse:collapse;font-size:11px}
  .comparison th,.comparison td{padding:7px 5px;border-top:1px solid var(--divider-color);text-align:right;white-space:nowrap}
  .comparison th:first-child,.comparison td:first-child{text-align:left}
  .comparison thead th{border-top:0;color:var(--secondary-text-color);font-weight:600}
  .consensus-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}
  .consensus-chip{padding:7px 9px;border-radius:10px;background:var(--secondary-background-color);font-size:11px}
  .pressure-main .big{font-size:34px}
  @media(max-width:420px){ha-card{padding:13px}.big{font-size:34px}.hero-icon{--mdc-icon-size:58px}.overview-hero{grid-template-columns:64px minmax(0,1fr) auto;gap:9px}.overview-big{font-size:28px}.day{flex-basis:calc(50% - 5px)}.risk-grid{grid-template-columns:1fr}.pollutants{grid-template-columns:repeat(2,minmax(0,1fr))}}
`;function c(r){return String(r??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Le(r){return r?.freshness?.status||"unknown"}function le(r){return ze[r]||"mdi:weather-partly-cloudy"}function de(r,e="var(--secondary-background-color)"){return`linear-gradient(${r}, ${r}), ${e}`}function De(r){return Number.isFinite(r)?r<3?{color:"#43a047",tint:"rgba(67,160,71,0.10)"}:r<6?{color:"#f9a825",tint:"rgba(249,168,37,0.11)"}:r<8?{color:"#fb8c00",tint:"rgba(251,140,0,0.12)"}:r<11?{color:"#e53935",tint:"rgba(229,57,53,0.12)"}:{color:"#8e24aa",tint:"rgba(142,36,170,0.13)"}:{color:"#78909c",tint:"rgba(120,144,156,0.08)"}}function Re(r){return Number.isFinite(r)?r<5?{color:"#9575cd",tint:"rgba(149,117,205,0.08)"}:r<20?{color:"#7e57c2",tint:"rgba(126,87,194,0.10)"}:r<40?{color:"#5e35b1",tint:"rgba(94,53,177,0.12)"}:r<70?{color:"#00897b",tint:"rgba(0,137,123,0.12)"}:{color:"#43a047",tint:"rgba(67,160,71,0.14)"}:{color:"#78909c",tint:"rgba(120,144,156,0.08)"}}function Te(r,e=!0){return e?["rgba(67,160,71,0.030)","rgba(3,155,229,0.045)","rgba(251,140,0,0.055)","rgba(229,57,53,0.060)"][Math.max(0,Math.min(3,Number(r)||0))]:"rgba(120,144,156,0.03)"}function qe(r,e=!0){return!e||!Number.isFinite(r)?"rgba(120,144,156,0.03)":r>=30?"rgba(198,40,40,0.060)":r>=20?"rgba(229,57,53,0.055)":r>=10?"rgba(251,140,0,0.050)":r>=5?"rgba(249,168,37,0.045)":"rgba(67,160,71,0.030)"}function je(r,e,t=!0){return t?e?Number.isFinite(r)?r>=70?"rgba(229,57,53,0.060)":r>=40?"rgba(251,140,0,0.055)":"rgba(249,168,37,0.045)":"rgba(251,140,0,0.050)":"rgba(67,160,71,0.030)":"rgba(120,144,156,0.03)"}function Oe(r){if(!r?.available)return"rgba(120,144,156,0.03)";if(r.warnings>0){let e=String(r.severity||"").toUpperCase();return["RED","R\xD6D"].includes(e)?"rgba(229,57,53,0.055)":e==="ORANGE"?"rgba(251,140,0,0.050)":"rgba(255,179,0,0.045)"}return r.messagesCount>0?"rgba(120,144,156,0.035)":"rgba(67,160,71,0.025)"}function Pe(r){return Number.isFinite(r)?r<=50?"rgba(67,160,71,0.045)":r<=100?"rgba(249,168,37,0.045)":r<=150?"rgba(251,140,0,0.050)":r<=200?"rgba(229,57,53,0.055)":r<=300?"rgba(142,36,170,0.055)":"rgba(127,29,29,0.060)":"rgba(120,144,156,0.03)"}function ue(r){return Number.isFinite(r)?r<=-5?{color:"#2979ff",tint:"rgba(41,121,255,0.16)"}:r<=5?{color:"#039be5",tint:"rgba(3,169,244,0.14)"}:r<=15?{color:"#00acc1",tint:"rgba(0,188,212,0.12)"}:r<=22?{color:"#f9a825",tint:"rgba(255,193,7,0.12)"}:r<=28?{color:"#fb8c00",tint:"rgba(255,152,0,0.13)"}:{color:"#e53935",tint:"rgba(244,67,54,0.14)"}:{color:"#039be5",tint:"rgba(3,169,244,0.10)"}}function We(r,e){let t={color:"#78909c",tint:"rgba(120,144,156,0.07)",icon:z[r]?.icon};return Number.isFinite(e)?r==="humidity"?e>=90?{color:"#0277bd",tint:"rgba(2,119,189,0.15)",icon:"mdi:water-percent"}:e>=75?{color:"#039be5",tint:"rgba(3,155,229,0.12)",icon:"mdi:water-percent"}:e>=50?{color:"#00acc1",tint:"rgba(0,172,193,0.09)",icon:"mdi:water-percent"}:{color:"#f9a825",tint:"rgba(249,168,37,0.09)",icon:"mdi:water-percent"}:r==="cloud_coverage"?e>=80?{color:"#78909c",tint:"rgba(120,144,156,0.14)",icon:"mdi:weather-cloudy"}:e>=50?{color:"#90a4ae",tint:"rgba(144,164,174,0.11)",icon:"mdi:weather-partly-cloudy"}:e>=20?{color:"#42a5f5",tint:"rgba(66,165,245,0.08)",icon:"mdi:weather-partly-cloudy"}:{color:"#f9a825",tint:"rgba(249,168,37,0.09)",icon:"mdi:weather-sunny"}:r==="dew_point"?e>=18?{color:"#fb8c00",tint:"rgba(251,140,0,0.11)",icon:"mdi:water-thermometer-outline"}:e>=12?{color:"#00acc1",tint:"rgba(0,172,193,0.11)",icon:"mdi:water-thermometer-outline"}:e>=5?{color:"#00b8d4",tint:"rgba(0,184,212,0.10)",icon:"mdi:water-thermometer-outline"}:{color:"#039be5",tint:"rgba(3,155,229,0.09)",icon:"mdi:water-thermometer-outline"}:r==="precipitation"?e>=7?{color:"#1565c0",tint:"rgba(21,101,192,0.18)",icon:"mdi:weather-pouring"}:e>=3?{color:"#1976d2",tint:"rgba(25,118,210,0.15)",icon:"mdi:weather-pouring"}:e>=1?{color:"#0288d1",tint:"rgba(2,136,209,0.13)",icon:"mdi:weather-rainy"}:e>0?{color:"#039be5",tint:"rgba(3,155,229,0.10)",icon:"mdi:weather-rainy"}:{color:"#90a4ae",tint:"rgba(144,164,174,0.06)",icon:"mdi:weather-partly-cloudy"}:{color:"var(--primary-color)",tint:"rgba(120,144,156,0.06)",icon:z[r]?.icon}:t}function He(r,e){if(!Number.isFinite(r)||!Number.isFinite(e)||e<=0||e>100)return null;let t=17.62,i=243.12,s=Math.log(e/100)+t*r/(i+r),o=i*s/(t-s);return Number.isFinite(o)?o:null}var W=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._config={},this._hass=null,this._resolver=null,this._forecast=new P(()=>this._scheduleRender()),this._scheduled=!1,this.shadowRoot.addEventListener("click",e=>{let i=e.target.closest?.("[data-more-info]")?.dataset?.moreInfo;i&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:i},bubbles:!0,composed:!0}))})}static async getConfigElement(){return document.createElement("weather-central-card-editor")}static getStubConfig(e){return{type:"custom:weather-central-card",weather_entity:Object.keys(e?.states||{}).find(i=>i==="weather.smhi_local")||Object.keys(e?.states||{}).find(i=>i.startsWith("weather."))||"",view:"overview",show_sources:!0,show_freshness:!0,use_fallbacks:!0}}setConfig(e){if(!e||typeof e!="object")throw new Error("Invalid card configuration");if(!e.weather_entity)throw new Error("weather_entity is required");this._config={view:"overview",show_sources:!0,show_freshness:!0,use_fallbacks:!0,dynamic_backgrounds:!0,overview_metrics:["humidity","cloud_coverage","dew_point","precipitation"],recovery_grace_seconds:120,...e},this._resolver&&this._resolver.update(this._hass,this._config),this._forecast.update(this._hass,this._config),this._updateForecastSubscriptions(),this._scheduleRender()}set hass(e){this._hass=e,this._resolver?this._resolver.update(e,this._config):this._resolver=new O(e,this._config),this._forecast.update(e,this._config),this._updateForecastSubscriptions(),this._scheduleRender()}get hass(){return this._hass}disconnectedCallback(){this._forecast.disconnect()}_updateForecastSubscriptions(){let e=this._config.view||"overview";["temperature","precipitation","pressure","risks"].includes(e)&&this._forecast.ensure("hourly"),["overview","forecast"].includes(e)&&this._forecast.ensure("daily"),e==="overview"&&this._forecast.ensure("hourly")}getCardSize(){return this._config.view==="diagnostics"?5:4}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}_scheduleRender(){this._scheduled||(this._scheduled=!0,queueMicrotask(()=>{this._scheduled=!1,this._render()}))}_meta(e,t,i=!1){if(!e||!this._config.show_sources&&!this._config.show_freshness)return"";let s=this._config.show_freshness?`<span class="dot ${Le(e)}" title="${c(a(t,e.freshness.status))}"></span>`:"",o=e.fallbackLevel>0?'<span class="fallback">\u21B3</span>':"",n=this._resolver?.baseProvider()?.label,l=i&&e.fallbackLevel===0&&e.source===n,d=this._config.show_sources&&!l?c(e.source):"";return!s&&!o&&!d?"":`<div class="meta">${s}${o}${d}</div>`}_formatReading(e,t,i){if(!t)return"\u2013";let s=z[e];if(e==="wind_bearing")return`${X(t.value,i)} ${Math.round(t.value)}\xB0`;let o=s?.unit||"";return e==="precipitation"&&/\/h|per.?hour/i.test(String(t.sourceUnit||""))&&(o="mm/h"),`${N(t.value,s?.decimals??1)} ${o}`.trim()}_derivedDewPoint(e,t){let i=He(e?.value,t?.value);if(!Number.isFinite(i))return null;let s=[e?.freshness?.status,t?.freshness?.status],o={unknown:3,stale:2,aging:1,fresh:0},n=s.filter(Boolean).sort((l,d)=>(o[d]??3)-(o[l]??3))[0]||"unknown";return{param:"dew_point",value:i,entityId:null,source:a(T(this._hass),"calculated"),sourceId:"calculated",role:"derived",fallbackLevel:1,freshness:{status:n},stale:n==="stale",derived:!0}}_overviewMetricReading(e,t,i){let s=this._resolver.resolve(e);if(s)return s;if(e==="dew_point")return this._derivedDewPoint(t,i);if(e==="precipitation"){let o=this._hourlySeries(),n=o?.forecast?.[0];if(n&&Number.isFinite(n.precipitation))return{param:e,value:n.precipitation,entityId:o.entityId,source:o.source,sourceId:o.sourceId,role:"forecast-current-hour",fallbackLevel:o.fallbackLevel,freshness:o.freshness,stale:o.freshness?.status==="stale",forecastFallback:!0}}return null}_overviewSummary(e){let i=this._resolver.baseProvider().id==="pirateweather"&&this._hass?.states?.["sensor.pirateweather_daily_summary"]?"sensor.pirateweather_daily_summary":null,s=this._config.summary_entity||i,o=s&&this._hass?.states?.[s];if(o&&!["unknown","unavailable",""].includes(String(o.state).toLowerCase()))return{text:String(o.state),source:o.attributes?.friendly_name||s,freshness:{status:"unknown"},fallbackLevel:0};let n=this._forecast.get("daily"),l=(n?.forecast||[]).slice(0,7);if(!l.length)return null;let d=l.filter(v=>["rainy","pouring","lightning","lightning-rainy","snowy-rainy"].includes(v.condition)),p=l.map(v=>({datetime:v.datetime,value:v.temperature})).filter(v=>Number.isFinite(v.value)).sort((v,g)=>g.value-v.value)[0],m=e==="sv"?"sv-SE":"en-GB",_=v=>new Date(v).toLocaleDateString(m,{weekday:"long"}),h=[];if(d.length){let v=d.slice(0,3).map(g=>_(g.datetime));h.push(e==="sv"?`Nederb\xF6rd v\xE4ntas ${v.join(", ")}.`:`Precipitation expected ${v.join(", ")}.`)}else h.push(e==="sv"?"Mestadels torrt de kommande dagarna.":"Mostly dry over the coming days.");return p&&h.push(e==="sv"?`H\xF6gst omkring ${Math.round(p.value)} \xB0C ${_(p.datetime)}.`:`High around ${Math.round(p.value)} \xB0C on ${_(p.datetime)}.`),{text:h.join(" "),source:n.source,freshness:n.freshness,fallbackLevel:n.fallbackLevel}}_overviewTile(e,t,i){let s=We(e,t?.value),o=t?.entityId?` data-more-info="${c(t.entityId)}"`:"",n=e==="precipitation"?t?.forecastFallback?a(i,"precipitation_hour"):a(i,"precipitation_now"):a(i,e);return`
      <div
        class="tile overview-tile"
        style="background:${this._tint(s.tint)}"
        ${o}
      >
        <div class="tile-head">
          <ha-icon
            icon="${s.icon||z[e]?.icon||"mdi:information-outline"}"
            style="color:${s.color}"
          ></ha-icon>
          <span>${c(n)}</span>
        </div>
        <div class="tile-value">${c(this._formatReading(e,t,i))}</div>
        ${this._meta(t,i,!0)}
      </div>
    `}_tile(e,t,i,s=!1){let o=z[e]||{},n=t?.entityId?` data-more-info="${c(t.entityId)}"`:"";return`
      <div class="${s?"tile overview-tile":"tile"}"${n}>
        <div class="tile-head">
          <ha-icon icon="${o.icon||"mdi:information-outline"}"></ha-icon>
          <span>${c(a(i,e))}</span>
        </div>
        <div class="tile-value">${c(this._formatReading(e,t,i))}</div>
        ${this._meta(t,i,!0)}
      </div>
    `}_overview(e){let t=this._hass?.states?.[this._config.weather_entity];if(!t)return`<div class="empty">${c(a(e,"no_data"))}: ${c(this._config.weather_entity)}</div>`;let i=this._resolver.baseProvider(),s=this._resolver.resolve("temperature"),o=this._resolver.resolve("apparent_temperature"),n=this._resolver.resolve("humidity"),l=this._resolver.resolve("cloud_coverage"),d=this._overviewMetricReading("dew_point",s,n),u=t.state,p=ue(s?.value),m=this._overviewSummary(e),_=t.last_reported||t.last_updated||t.last_changed,h=_?new Date(_):null,v=h&&!Number.isNaN(h.getTime())?h.toLocaleTimeString(e==="sv"?"sv-SE":"en-GB",{hour:"2-digit",minute:"2-digit"}):"\u2013",g=(Array.isArray(this._config.overview_metrics)?this._config.overview_metrics:["humidity","cloud_coverage","dew_point","precipitation"]).slice(0,4),y={humidity:n,cloud_coverage:l,dew_point:d},E=g.map(x=>{let F=y[x]||this._overviewMetricReading(x,s,n);return this._overviewTile(x,F,e)}).join("");return`
      <div
        class="overview-hero"
        data-more-info="${c(this._config.weather_entity)}"
      >
        <ha-icon
          class="hero-icon"
          icon="${le(u)}"
          style="color:${p.color}"
        ></ha-icon>

        <div class="overview-info">
          <div class="overview-big">${c(this._formatReading("temperature",s,e))}</div>
          <div class="overview-condition">
            ${c(a(e,u))}
          </div>
          <div class="overview-detail">
            ${o?`${c(a(e,"apparent_temperature"))} ${c(this._formatReading("apparent_temperature",o,e))}`:""}
            ${d?`<br>${c(a(e,"dew_point"))} ${c(this._formatReading("dew_point",d,e))}`:""}
            ${l?` \xB7 ${c(a(e,"cloud_coverage"))} ${c(this._formatReading("cloud_coverage",l,e))}`:""}
          </div>
        </div>

        <div class="provider">
          ${c(i.label)}
        </div>
      </div>

      ${m?.text?`
          <div class="overview-summary">
            ${c(m.text)}
            ${m.fallbackLevel>0?`
                <div class="meta" style="justify-content:flex-end">
                  ${this._config.show_freshness?`<span class="dot ${m.freshness?.status||"unknown"}"></span>`:""}
                  <span class="fallback">\u21B3</span>
                  ${this._config.show_sources?c(m.source):""}
                </div>
              `:""}
            <div class="overview-updated">
              \u21BB ${c(a(e,"updated"))} ${c(v)}
            </div>
          </div>
        `:""}

      <div class="overview-grid">
        ${E}
      </div>
    `}_seriesMeta(e,t){if(!e||!this._config.show_sources&&!this._config.show_freshness)return"";let i=this._config.show_freshness?`<span class="dot ${e.freshness?.status||"unknown"}" title="${c(a(t,e.freshness?.status||"unknown"))}"></span>`:"",s=e.fallbackLevel>0?'<span class="fallback">\u21B3</span>':"",o=this._config.show_sources?c(e.source):"";return`<div class="series-meta">${i}${s}${o}</div>`}_hourlySeries(){let e=this._forecast.get("hourly");if(!e)return null;let t=Date.now()-45*6e4;return{...e,forecast:e.forecast.filter(i=>Date.parse(i.datetime)>=t).slice(0,12)}}_temperatureForecast(e){let t=this._hourlySeries(),i=(t?.forecast||[]).filter(w=>Number.isFinite(w.temperature));if(i.length<2)return`<div class="empty">${c(a(e,"no_data"))}</div>`;let s=620,o=190,n=28,l=28,d=38,u=40,p=i.map(w=>w.temperature),m=Math.min(...p),_=Math.max(...p),h=Math.max(2,_-m),v=m-1,g=_+1,y=Math.max(2,g-v),E=s-n-l,x=o-d-u,F=i.map((w,f)=>{let I=n+f*E/Math.max(1,i.length-1),j=d+(g-w.temperature)/y*x,B=new Date(w.datetime);return{x:I,y:j,value:w.temperature,time:B.toLocaleTimeString(e==="sv"?"sv-SE":"en-GB",{hour:"2-digit",minute:"2-digit"})}}),L=F.map(w=>`${w.x},${w.y}`).join(" "),U=F.map((w,f)=>f===0||f===F.length-1||f%2===0?`<circle cx="${w.x}" cy="${w.y}" r="3.7" fill="var(--primary-color)"/><text x="${w.x}" y="${w.y-9}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--primary-text-color)">${Math.round(w.value)}\xB0</text><text x="${w.x}" y="${o-12}" text-anchor="middle" font-size="9.5" fill="var(--secondary-text-color)">${c(w.time)}</text>`:`<circle cx="${w.x}" cy="${w.y}" r="3.2" fill="var(--primary-color)"/>`).join("");return`<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:thermometer"></ha-icon>${c(a(e,"view_temperature"))}</div><div class="forecast-sub">${c(a(e,"next_12_hours"))}</div></div><svg class="temp-chart" viewBox="0 0 ${s} ${o}"><line x1="${n}" y1="${o-u}" x2="${s-l}" y2="${o-u}" stroke="var(--divider-color)" stroke-width="1"/><polyline points="${L}" fill="none" stroke="var(--primary-color)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>${U}</svg>`+this._seriesMeta(t,e)}_precipitationForecast(e){let t=this._hourlySeries(),i=t?.forecast||[];if(!i.length)return`<div class="empty">${c(a(e,"no_data"))}</div>`;let s=i.map(o=>{let l=new Date(o.datetime).toLocaleTimeString(e==="sv"?"sv-SE":"en-GB",{hour:"2-digit",minute:"2-digit"}),d=Number.isFinite(o.precipitation_probability)?`${Math.round(o.precipitation_probability)} %`:"\u2013",u=Number.isFinite(o.precipitation)?`${N(o.precipitation,1)} mm`:"\u2013";return`<div class="hour"><div class="hour-time">${c(l)}</div><div class="hour-main">${c(d)}</div><div class="hour-sub">${c(u)}</div></div>`}).join("");return`<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:weather-rainy"></ha-icon>${c(a(e,"view_precipitation"))}</div><div class="forecast-sub">${c(a(e,"next_12_hours"))}</div></div><div class="hours">${s}</div>`+this._seriesMeta(t,e)}_dailyForecast(e){let t=this._forecast.get("daily"),i=(t?.forecast||[]).slice(0,7);if(!i.length)return`<div class="empty">${c(a(e,"no_data"))}</div>`;let s=e==="sv"?"sv-SE":"en-GB",o=i.map((n,l)=>{let d=new Date(n.datetime),u=l===0?e==="sv"?"Idag":"Today":d.toLocaleDateString(s,{weekday:"short"}).replace(".",""),p=d.toLocaleDateString(s,{day:"numeric",month:"numeric"}),m=Number.isFinite(n.temperature)?`${Math.round(n.temperature)}\xB0`:"\u2013",_=Number.isFinite(n.templow)?`${Math.round(n.templow)}\xB0`:"",h=Number.isFinite(n.precipitation_probability)?`${Math.round(n.precipitation_probability)} %`:"\u2013";return`<div class="day"><div class="day-name">${c(u)}</div><div class="day-date">${c(p)}</div><ha-icon icon="${le(n.condition)}"></ha-icon><div class="day-temp">${c(m)}<span class="day-low">${c(_)}</span></div><div class="hour-sub">\u{1F4A7} ${c(h)}</div></div>`}).join("");return`<div class="forecast-head"><div class="section-title" style="margin:0"><ha-icon icon="mdi:calendar-week"></ha-icon>${c(a(e,"view_forecast"))}</div><div class="forecast-sub">${c(a(e,"today_plus_6"))}</div></div><div class="forecast-days">${o}</div>`+this._seriesMeta(t,e)}_windTile(e,t,i){let s=z[e]||{};return`
      <div class="tile wind-tile"${t?.entityId?` data-more-info="${c(t.entityId)}"`:""}>
        <div class="tile-head">
          <ha-icon
            icon="${s.icon||"mdi:information-outline"}"
          ></ha-icon>
          <span>${c(a(i,e))}</span>
        </div>
        <div class="tile-value">${c(this._formatReading(e,t,i))}</div>
        ${this._meta(t,i,!0)}
      </div>
    `}_wind(e){let t=this._resolver.resolve("wind_speed"),i=this._resolver.resolve("wind_gust"),s=this._resolver.resolve("wind_bearing"),o=this._resolver.resolve("pressure"),n=this._resolver.resolve("visibility"),l=this._resolver.resolve("humidity");return`
      <div class="section-title">
        <ha-icon icon="mdi:weather-windy"></ha-icon>
        ${c(a(e,"view_wind"))}
      </div>
      <div class="wind-grid">
        ${this._windTile("wind_speed",t,e)}
        ${this._windTile("wind_gust",i,e)}
        ${this._windTile("wind_bearing",s,e)}
        ${this._windTile("pressure",o,e)}
        ${this._windTile("visibility",n,e)}
        ${this._windTile("humidity",l,e)}
      </div>
    `}_pressure(e){let t=this._resolver.resolve("pressure"),i=this._hourlySeries(),s=(i?.forecast||[]).filter(n=>Number.isFinite(n.pressure)),o="";if(s.length>=2){let _=s.map(f=>f.pressure),h=Math.min(..._),v=Math.max(..._),g=h-1,y=v+1,E=Math.max(2,y-g),x=564,F=94,L=s.map((f,I)=>{let j=28+I*x/Math.max(1,s.length-1),B=22+(y-f.pressure)/E*F,me=new Date(f.datetime).toLocaleTimeString(e==="sv"?"sv-SE":"en-GB",{hour:"2-digit",minute:"2-digit"});return{x:j,y:B,value:f.pressure,time:me}}),U=L.map(f=>`${f.x},${f.y}`).join(" "),w=L.map((f,I)=>I===0||I===L.length-1||I%3===0?`<circle cx="${f.x}" cy="${f.y}" r="3.5" fill="var(--primary-color)"/><text x="${f.x}" y="${f.y-8}" text-anchor="middle" font-size="10" font-weight="600" fill="var(--primary-text-color)">${Math.round(f.value)}</text><text x="${f.x}" y="140" text-anchor="middle" font-size="9" fill="var(--secondary-text-color)">${c(f.time)}</text>`:`<circle cx="${f.x}" cy="${f.y}" r="3" fill="var(--primary-color)"/>`).join("");o=`<div class="forecast-sub">${c(a(e,"next_12_hours"))} \xB7 ${Math.round(h)}\u2013${Math.round(v)} mbar</div><svg class="temp-chart" viewBox="0 0 620 150"><line x1="28" y1="116" x2="592" y2="116" stroke="var(--divider-color)" stroke-width="1"/><polyline points="${U}" fill="none" stroke="var(--primary-color)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>${w}</svg>`+this._seriesMeta(i,e)}return`
      <div class="section-title">
        <ha-icon icon="mdi:gauge"></ha-icon>
        ${c(a(e,"view_pressure"))}
      </div>

      ${t?`<div class="main pressure-main"><div>
            <div class="big">${c(this._formatReading("pressure",t,e))}</div>
            ${this._meta(t,e)}
          </div></div>`:`<div class="empty">${c(a(e,"no_data"))}</div>`}

      ${o}

      <div class="footer">
        <span></span>
        <span>${ce}</span>
      </div>
    `}_tint(e,t="var(--secondary-background-color)"){return this._config.dynamic_backgrounds===!1?t:de(e,t)}_extraMeta(e,t){if(!e)return"";let i=this._config.show_freshness?`<span class="dot ${e.freshness?.status||"unknown"}"></span>`:"",s=this._config.show_sources?c(e.source||""):"";return!i&&!s?"":`<div class="meta">${i}${s}</div>`}_sky(e){let t=re(this._hass,this._config),i=t.sun?.state==="above_horizon",s=i?t.sun?.nextSetting:t.sun?.nextRising,o=s?new Date(s).toLocaleTimeString(e==="sv"?"sv-SE":"en-GB",{hour:"2-digit",minute:"2-digit"}):"\u2013",n=t.uv?.value,l=Number.isFinite(n)?n<3?a(e,"uv_low"):n<6?a(e,"uv_moderate"):n<8?a(e,"uv_high"):n<11?a(e,"uv_very_high"):a(e,"uv_extreme"):a(e,"missing"),d=t.aurora?.value,u=De(n),p=Re(d),m=Number.isFinite(d)?d<5?a(e,"aurora_very_low"):d<20?a(e,"aurora_low"):d<40?a(e,"aurora_possible"):d<70?a(e,"aurora_good"):a(e,"aurora_very_good"):a(e,"missing"),h={new_moon:["mdi:moon-new","moon_new"],waxing_crescent:["mdi:moon-waxing-crescent","moon_waxing_crescent"],first_quarter:["mdi:moon-first-quarter","moon_first_quarter"],waxing_gibbous:["mdi:moon-waxing-gibbous","moon_waxing_gibbous"],full_moon:["mdi:moon-full","moon_full"],waning_gibbous:["mdi:moon-waning-gibbous","moon_waning_gibbous"],last_quarter:["mdi:moon-last-quarter","moon_last_quarter"],waning_crescent:["mdi:moon-waning-crescent","moon_waning_crescent"]}[t.moon?.phase]||["mdi:moon-waning-crescent","missing"];return`
      <div class="section-title">
        <ha-icon icon="mdi:weather-sunset"></ha-icon>
        ${c(a(e,"view_sky"))}
      </div>

      <div class="extra-grid">
        <div class="extra-tile" style="background:${this._tint(i?"rgba(249,168,37,0.08)":"rgba(126,87,194,0.08)")}"${t.sun?.entityId?` data-more-info="${c(t.sun.entityId)}"`:""}>
          <div class="extra-title"><ha-icon icon="${i?"mdi:white-balance-sunny":"mdi:weather-night"}"></ha-icon>${c(a(e,"sun"))}</div>
          <div class="extra-value">${c(i?a(e,"sun_up"):a(e,"sun_down"))}</div>
          <div class="extra-sub">${c(i?a(e,"sunset"):a(e,"sunrise"))}: ${c(o)}${Number.isFinite(t.sun?.elevation)?` \xB7 ${t.sun.elevation.toFixed(1)}\xB0`:""}</div>
          ${this._extraMeta(t.sun,e)}
        </div>

        <div class="extra-tile" style="background:${this._tint("rgba(92,107,192,0.08)")}"${t.moon?.entityId?` data-more-info="${c(t.moon.entityId)}"`:""}>
          <div class="extra-title"><ha-icon icon="${h[0]}"></ha-icon>${c(a(e,"moon"))}</div>
          <div class="extra-value">${c(a(e,h[1]))}</div>
          <div class="extra-sub">${c(a(e,"moon_phase"))}</div>
          ${this._extraMeta(t.moon,e)}
        </div>

        <div class="extra-tile" style="background:${this._tint(u.tint)}"${t.uv?.entityId?` data-more-info="${c(t.uv.entityId)}"`:""}>
          <div class="extra-title"><ha-icon icon="mdi:weather-sunny-alert" style="color:${u.color}"></ha-icon>UV-index</div>
          <div class="extra-value">${Number.isFinite(n)?c(N(n,1)):"\u2013"}</div>
          <div class="extra-sub" style="color:${u.color};font-weight:600">${c(l)}</div>
          ${this._extraMeta(t.uv,e)}
        </div>

        <div class="extra-tile" style="background:${this._tint(p.tint)}"${t.aurora?.entityId?` data-more-info="${c(t.aurora.entityId)}"`:""}>
          <div class="extra-title"><ha-icon icon="mdi:aurora" style="color:${p.color}"></ha-icon>${c(a(e,"aurora"))}</div>
          <div class="extra-value">${Number.isFinite(d)?`${Math.round(d)} %`:"\u2013"}</div>
          <div class="extra-sub" style="color:${p.color};font-weight:600">${c(m)}</div>
          ${this._extraMeta(t.aurora,e)}
        </div>
      </div>
    `}_risks(e){let t=this._hourlySeries(),i=se(this._hass,this._config,t),s=[["mdi:shield-check-outline","risk_none"],["mdi:snowflake-thermometer","risk_low"],["mdi:snowflake-alert","risk_elevated"],["mdi:car-brake-alert","risk_high"]],o=s[i.frost.level]||s[0],n=i.frost.available===!0,l=i.fire.available===!0,d=i.thunder.available===!0,u=n?a(e,o[1]):a(e,"missing"),p=l?i.fire.active?a(e,"risk_relevant"):a(e,"risk_not_relevant"):a(e,"missing"),m=d?i.thunder.active?a(e,"risk_relevant"):a(e,"risk_not_relevant"):a(e,"missing");return`
      <div class="section-title">
        <ha-icon icon="mdi:shield-alert-outline"></ha-icon>
        ${c(a(e,"view_risks"))}
      </div>
      <div class="risk-grid">
        <div class="risk-card" style="background:${this._tint(Te(i.frost.level,n))}"${i.frost.entityId?` data-more-info="${c(i.frost.entityId)}"`:""}>
          <ha-icon class="risk-icon" icon="${o[0]}"></ha-icon>
          <div class="risk-name">${c(a(e,"frost_ice"))}</div>
          <div class="risk-state">${c(u)}</div>
          <div class="extra-sub">${Number.isFinite(i.frost.minTemp)?`${c(a(e,"minimum"))}: ${N(i.frost.minTemp,1)} \xB0C`:""}</div>
          ${this._extraMeta(i.frost,e)}
        </div>

        <div class="risk-card" style="background:${this._tint(je(i.thunder.value,i.thunder.active,d))}"${i.thunder.entityId?` data-more-info="${c(i.thunder.entityId)}"`:""}>
          <ha-icon class="risk-icon" icon="mdi:weather-lightning"></ha-icon>
          <div class="risk-name">${c(a(e,"thunder"))}</div>
          <div class="risk-state">${c(m)}</div>
          <div class="extra-sub">${Number.isFinite(i.thunder.value)?`${Math.round(i.thunder.value)} %`:""}</div>
          ${this._extraMeta(i.thunder,e)}
        </div>

        <div class="risk-card" style="background:${this._tint(qe(i.fire.index,l))}"${i.fire.entityId?` data-more-info="${c(i.fire.entityId)}"`:""}>
          <ha-icon class="risk-icon" icon="mdi:fire-alert"></ha-icon>
          <div class="risk-name">${c(a(e,"fire_risk"))}</div>
          <div class="risk-state">${c(p)}</div>
          <div class="extra-sub">${Number.isFinite(i.fire.index)?`${c(a(e,"index"))}: ${N(i.fire.index,0)}`:""}</div>
          ${this._extraMeta(i.fire,e)}
        </div>
      </div>
    `}_alerts(e){let t=ne(this._hass,this._config),i=l=>{let d=String(l?.code||l?.severity||l?.level||"").toUpperCase();return["RED","R\xD6D"].includes(d)?["#e53935","mdi:alert-octagon","R\xF6d"]:d==="ORANGE"?["#fb8c00","mdi:alert","Orange"]:["YELLOW","GUL"].includes(d)?["#ffb300","mdi:alert-outline","Gul"]:["#78909c","mdi:information-outline",a(e,"message")]},s={THUNDER:"mdi:weather-lightning",WIND:"mdi:weather-windy",SNOW:"mdi:weather-snowy-heavy",BLACK_ICE:"mdi:car-brake-alert",RAIN:"mdi:weather-pouring",FIRE:"mdi:fire-alert",HIGH_TEMPERATURES:"mdi:thermometer-high",FLOODING:"mdi:home-flood"},o=t.messages.slice(0,3).map(l=>{let d=i(l),u=l.event_description_sv||l.descr||l.event_sv||l.event||a(e,"smhi_message"),p=l.area_name_sv||l.area||"",m=s[l.event_code]||d[1],_=Array.isArray(l.description_items)?l.description_items:[],h=_.find(g=>g.code==="HAPPENS")||_.find(g=>g.code==="INCIDENT"),v=h?.text_sv||h?.text||"";return`
          <div class="alert-item" style="border-left-color:${d[0]}">
            <ha-icon icon="${m}" style="color:${d[0]}"></ha-icon>
            <div>
              <div class="alert-title">${c(u)}</div>
              <div class="alert-sub"><b style="color:${d[0]}">${c(d[2])}</b>${p?` \xB7 ${c(p)}`:""}</div>
              ${v?`<div class="alert-sub">${c(v)}</div>`:""}
            </div>
          </div>
        `}).join(""),n=t.available?`
          <div class="alert-item" style="border-left-color:var(--success-color,#43a047)">
            <ha-icon icon="mdi:check-circle-outline" style="color:var(--success-color,#43a047)"></ha-icon>
            <div><div class="alert-title">${c(a(e,"no_active_alerts"))}</div></div>
          </div>
        `:`
          <div class="alert-item">
            <ha-icon icon="mdi:help-circle-outline"></ha-icon>
            <div><div class="alert-title">${c(a(e,"missing"))}</div></div>
          </div>
        `;return`
      <div class="module-tint" style="background:${this._tint(Oe(t),"transparent")};border-radius:12px;padding:2px">
      <div class="section-title">
        <ha-icon icon="mdi:hazard-lights"></ha-icon>
        ${c(a(e,"view_alerts"))}
      </div>
      <div class="forecast-sub" style="margin-bottom:10px">
        ${t.warnings} ${c(a(e,"warnings"))} \xB7
        ${t.messagesCount} ${c(a(e,"messages"))}
        ${t.severity?` \xB7 ${c(t.severity)}`:""}
      </div>
      <div class="alert-list">
        ${o||n}
      </div>
      ${this._extraMeta(t,e)}
      </div>
    `}_airQuality(e){let t=oe(this._hass,this._config),i=t.aqi,s=Number.isFinite(i)?i<=50?[a(e,"aqi_good"),"#43a047"]:i<=100?[a(e,"aqi_moderate"),"#f9a825"]:i<=150?[a(e,"aqi_sensitive"),"#fb8c00"]:i<=200?[a(e,"aqi_unhealthy"),"#e53935"]:i<=300?[a(e,"aqi_very_unhealthy"),"#8e24aa"]:[a(e,"aqi_hazardous"),"#7f1d1d"]:[a(e,"missing"),"#78909c"],o=l=>{let d={o3:"O\u2083",no2:"NO\u2082",so2:"SO\u2082",co:"CO",pm10:"PM10",pm25:"PM2.5",neph:"NEPH"},u=String(l||"").toLowerCase().trim();return d[u]||l||"\u2013"},n=(l,d)=>`
      <div class="pollutant">
        <span class="extra-sub">${l}</span>
        <strong>${Number.isFinite(d)?c(N(d,Number.isInteger(d)?0:1)):"\u2013"}</strong>
      </div>
    `;return`
      <div class="module-tint" style="background:${this._tint(Pe(i),"transparent")};border-radius:12px;padding:2px">
      <div class="section-title">
        <ha-icon icon="mdi:air-filter"></ha-icon>
        ${c(a(e,"view_air_quality"))}
      </div>
      <div class="aqi-hero"${t.entities.aqi?` data-more-info="${c(t.entities.aqi)}"`:""}>
        <div>
          <div class="aqi-number" style="color:${s[1]}">${Number.isFinite(i)?Math.round(i):"\u2013"}</div>
          <div class="extra-sub" style="text-align:center">AQI</div>
        </div>
        <div>
          <div class="extra-value" style="color:${s[1]}">${c(s[0])}</div>
          <div class="extra-sub">${c(a(e,"dominant_pollutant"))}</div>
          <div style="font-size:15px;font-weight:650;margin-top:3px">${c(o(t.dominant))}</div>
        </div>
      </div>
      <div class="pollutants">
        ${n("O\u2083",t.o3)}
        ${n("NO\u2082",t.no2)}
        ${n("PM2.5",t.pm25)}
        ${n("PM10",t.pm10)}
      </div>
      ${t.station?`<div class="extra-sub" style="margin-top:8px">${c(t.station)}</div>`:""}
      ${this._extraMeta(t,e)}
      </div>
    `}_comparison(e){let t=ae(this._hass,this._config),i=[];t.consensus.temperature&&i.push(`<div class="consensus-chip"><b>${c(a(e,"consensus_temperature"))}</b> ${N(t.consensus.temperature.value,1)} \xB0C</div>`),t.consensus.wind&&i.push(`<div class="consensus-chip"><b>${c(a(e,"consensus_wind"))}</b> ${N(t.consensus.wind.value,1)} m/s</div>`);let s=(n,l=1)=>Number.isFinite(n)?N(n,l):"\u2013",o=t.providers.map(n=>`
      <tr data-more-info="${c(n.entityId)}">
        <td>
          <span class="dot ${n.freshness?.status||"unknown"}"></span>
          ${c(n.source)}
          ${n.modelFamily?`<div class="diag-sub">${c(n.modelFamily)}${n.implementation?` \xB7 ${c(n.implementation)}`:""}</div>`:""}
        </td>
        <td>${s(n.values.temperature,1)}\xB0</td>
        <td>${s(n.values.wind_speed,1)}</td>
        <td>${s(n.values.pressure,0)}</td>
        <td>${s(n.values.cloud_coverage,0)}%</td>
      </tr>
    `).join("");return`
      <div class="section-title">
        <ha-icon icon="mdi:compare-horizontal"></ha-icon>
        ${c(a(e,"view_comparison"))}
      </div>
      ${i.length?`<div class="consensus-row">${i.join("")}</div>`:""}
      <div class="comparison-wrap">
      <table class="comparison">
        <thead>
          <tr>
            <th>${c(a(e,"source"))}</th>
            <th>\xB0C</th>
            <th>m/s</th>
            <th>mbar</th>
            <th>% \u2601</th>
          </tr>
        </thead>
        <tbody>
          ${o||`<tr><td colspan="5">${c(a(e,"no_data"))}</td></tr>`}
        </tbody>
      </table>
      </div>
    `}_diagnostics(e){let t=this._resolver.baseProvider(),i=G.map(n=>({param:n,reading:this._resolver.resolve(n)})),s=i.filter(n=>n.reading).length,o=i.map(({param:n,reading:l})=>{let d=l?c(this._formatReading(n,l,e)):`<span style="color:var(--secondary-text-color)">${c(a(e,"missing"))}</span>`,u=l?this._meta(l,e):'<div class="meta"><span class="dot unknown"></span></div>';return`
        <div class="diag-row">
          <div>
            <div class="diag-name">${c(a(e,n))}</div>
            <div class="diag-sub">${c(l?.entityId||"\u2014")}</div>
          </div>
          <div class="diag-value">
            ${d}
            ${u}
          </div>
        </div>
      `}).join("");return`
      <div class="section-title">
        <ha-icon icon="mdi:stethoscope"></ha-icon>
        ${c(a(e,"view_diagnostics"))}
      </div>
      <div class="secondary" style="margin-bottom:8px">
        ${c(a(e,"data_coverage"))}: <b>${s}/${G.length}</b>
        \xB7 ${c(t.label)} \xB7 ${ce}
      </div>
      <div class="diag">${o}</div>
    `}_render(){if(!this._hass||!this._config?.weather_entity||!this._resolver)return;let e=T(this._hass),t=this._config.view||"overview",i;t==="temperature"?i=this._temperatureForecast(e):t==="precipitation"?i=this._precipitationForecast(e):t==="forecast"?i=this._dailyForecast(e):t==="wind"?i=this._wind(e):t==="pressure"?i=this._pressure(e):t==="sky"?i=this._sky(e):t==="risks"?i=this._risks(e):t==="alerts"?i=this._alerts(e):t==="air_quality"?i=this._airQuality(e):t==="comparison"?i=this._comparison(e):t==="diagnostics"?i=this._diagnostics(e):i=this._overview(e);let s="";if(t==="overview"&&this._config.dynamic_backgrounds!==!1){let o=this._resolver.resolve("temperature"),n=ue(o?.value);s=`background:${de(n.tint,"var(--ha-card-background,var(--card-background-color))")}`}this.shadowRoot.innerHTML=`<style>${Ce}</style><ha-card style="${s}">${i}</ha-card>`}};var Ve=["temperature","apparent_temperature","humidity","cloud_coverage","wind_speed","wind_gust","pressure","visibility","dew_point","precipitation"],Ue=[["sun_entity","editor_sun"],["moon_entity","editor_moon"],["uv_entity","editor_uv"],["aurora_entity","editor_aurora"],["frost_risk_entity","editor_frost"],["fire_risk_entity","editor_fire"],["thunder_risk_entity","editor_thunder"],["alerts_status_entity","editor_alerts_status"],["alerts_entity","editor_alerts"],["aqi_entity","editor_aqi"],["dominant_pollutant_entity","editor_dominant"],["ozone_entity","editor_ozone"],["no2_entity","editor_no2"],["pm25_entity","editor_pm25"],["pm10_entity","editor_pm10"]],Be=`
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
`,H=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._hass=null,this._config={},this._rendered=!1,this.shadowRoot.addEventListener("change",e=>this._onChange(e)),this.shadowRoot.addEventListener("value-changed",e=>this._onValueChanged(e))}set hass(e){this._hass=e,this._rendered?this._syncPickers():this._render()}get hass(){return this._hass}setConfig(e){this._config={view:"overview",show_sources:!0,show_freshness:!0,use_fallbacks:!0,dynamic_backgrounds:!0,overview_metrics:["humidity","cloud_coverage","dew_point","precipitation"],...e||{}},this._render()}_emit(e){this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:{...e}},bubbles:!0,composed:!0}))}_setField(e,t){let i={...this._config};t===""||t==null?delete i[e]:i[e]=t,this._emit(i)}_setOverviewMetric(e,t){let i=JSON.parse(JSON.stringify(this._config||{})),s=["humidity","cloud_coverage","dew_point","precipitation"],o=Array.isArray(i.overview_metrics)?[...i.overview_metrics]:[...s];o[e]=t,i.overview_metrics=o.slice(0,4),this._emit(i)}_setParam(e,t,i){var o;let s=JSON.parse(JSON.stringify(this._config||{}));s.parameters||(s.parameters={}),(o=s.parameters)[e]||(o[e]={}),t==="primary"?i?s.parameters[e].primary=i:delete s.parameters[e].primary:t==="fallback1"&&(s.parameters[e].fallbacks=i?[i]:[],i||delete s.parameters[e].fallbacks),!s.parameters[e].primary&&!(s.parameters[e].fallbacks||[]).length&&delete s.parameters[e],Object.keys(s.parameters).length||delete s.parameters,this._emit(s)}_onChange(e){let t=e.target,i=t?.dataset?.field;if(i){if(t?.dataset?.overviewIndex!=null){this._setOverviewMetric(Number(t.dataset.overviewIndex),t.value);return}if(!(t?.dataset?.param||t?.tagName?.toLowerCase()==="ha-entity-picker")){if(["show_sources","show_freshness","use_fallbacks","dynamic_backgrounds"].includes(i)){this._setField(i,!!t.checked);return}this._setField(i,t.value)}}}_onValueChanged(e){let t=e.target,i=t?.dataset?.field,s=t?.dataset?.param,o=e.detail?.value||"";s&&i?this._setParam(s,i,o):i&&this._setField(i,o)}_picker(e,t,i=null){return`
      <ha-entity-picker
        data-field="${e}"
        ${i?`data-param="${i}"`:""}
        value="${t||""}"
      ></ha-entity-picker>
    `}_syncPickers(){this.shadowRoot.querySelectorAll("ha-entity-picker").forEach(e=>{e.hass=this._hass;let t=e.dataset.field;(t==="weather_entity"||t.startsWith("fallback_weather"))&&(e.includeDomains=["weather"])})}_render(){let e=T(this._hass),t=this._config||{},i=["humidity","cloud_coverage","dew_point","precipitation","wind_speed","wind_gust","visibility","pressure"],o=(Array.isArray(t.overview_metrics)?t.overview_metrics:["humidity","cloud_coverage","dew_point","precipitation"]).slice(0,4).map((d,u)=>`
        <div class="row">
          <label>${a(e,"editor_overview_metric")} ${u+1}</label>
          <select
            data-field="overview_metric_${u}"
            data-overview-index="${u}"
          >
            ${i.map(p=>`
              <option
                value="${p}"
                ${d===p?"selected":""}
              >
                ${a(e,p)}
              </option>
            `).join("")}
          </select>
        </div>
      `).join(""),n=Ue.map(([d,u])=>{let p=t[d],m=Q[d],_=p||(m&&this._hass?.states?.[m]?m:"");return`
        <div class="param">
          <div class="param-title">${a(e,u)}</div>
          ${this._picker(d,_)}
        </div>
      `}).join(""),l=Ve.map(d=>{let u=t.parameters?.[d]||{};return`
        <div class="param">
          <div class="param-title">${a(e,d)}</div>
          <div class="cols">
            <div class="row">
              <label>${a(e,"editor_primary")}</label>
              ${this._picker("primary",u.primary,d)}
            </div>
            <div class="row">
              <label>${a(e,"editor_fallback1")}</label>
              ${this._picker("fallback1",u.fallbacks?.[0],d)}
            </div>
          </div>
        </div>
      `}).join("");this.shadowRoot.innerHTML=`
      <style>${Be}</style>
      <div class="wrap">
        <div class="row">
          <label>${a(e,"editor_weather")}</label>
          ${this._picker("weather_entity",t.weather_entity)}
        </div>

        <details>
          <summary>${a(e,"editor_overview")}</summary>
          <div class="hint">${a(e,"editor_overview_hint")}</div>
          <div class="cols">
            ${o}
          </div>
          <div class="row" style="margin-top:10px">
            <label>${a(e,"editor_summary_entity")}</label>
            ${this._picker("summary_entity",t.summary_entity)}
          </div>
        </details>

        <div class="row">
          <label>${a(e,"editor_view")}</label>
          <select data-field="view">
            <option value="overview" ${t.view==="overview"?"selected":""}>
              ${a(e,"view_overview")}
            </option>
            <option value="temperature" ${t.view==="temperature"?"selected":""}>
              ${a(e,"view_temperature")}
            </option>
            <option value="precipitation" ${t.view==="precipitation"?"selected":""}>
              ${a(e,"view_precipitation")}
            </option>
            <option value="forecast" ${t.view==="forecast"?"selected":""}>
              ${a(e,"view_forecast")}
            </option>
            <option value="wind" ${t.view==="wind"?"selected":""}>
              ${a(e,"view_wind")}
            </option>
            <option value="pressure" ${t.view==="pressure"?"selected":""}>
              ${a(e,"view_pressure")}
            </option>
            <option value="sky" ${t.view==="sky"?"selected":""}>
              ${a(e,"view_sky")}
            </option>
            <option value="risks" ${t.view==="risks"?"selected":""}>
              ${a(e,"view_risks")}
            </option>
            <option value="alerts" ${t.view==="alerts"?"selected":""}>
              ${a(e,"view_alerts")}
            </option>
            <option value="air_quality" ${t.view==="air_quality"?"selected":""}>
              ${a(e,"view_air_quality")}
            </option>
            <option value="comparison" ${t.view==="comparison"?"selected":""}>
              ${a(e,"view_comparison")}
            </option>
            <option value="diagnostics" ${t.view==="diagnostics"?"selected":""}>
              ${a(e,"view_diagnostics")}
            </option>
          </select>
        </div>

        <div class="toggle">
          <span>${a(e,"editor_sources")}</span>
          <input
            data-field="show_sources"
            type="checkbox"
            ${t.show_sources!==!1?"checked":""}
          >
        </div>

        <div class="toggle">
          <span>${a(e,"editor_freshness")}</span>
          <input
            data-field="show_freshness"
            type="checkbox"
            ${t.show_freshness!==!1?"checked":""}
          >
        </div>

        <div class="toggle">
          <span>${a(e,"editor_fallbacks")}</span>
          <input
            data-field="use_fallbacks"
            type="checkbox"
            ${t.use_fallbacks!==!1?"checked":""}
          >
        </div>

        <div class="toggle">
          <span>${a(e,"editor_dynamic_backgrounds")}</span>
          <input
            data-field="dynamic_backgrounds"
            type="checkbox"
            ${t.dynamic_backgrounds!==!1?"checked":""}
          >
        </div>

        <div class="cols">
          <div class="row">
            <label>${a(e,"editor_fallback1")} \xB7 weather</label>
            ${this._picker("fallback_weather_1",t.fallback_weather_1)}
          </div>

          <div class="row">
            <label>${a(e,"editor_fallback2")} \xB7 weather</label>
            ${this._picker("fallback_weather_2",t.fallback_weather_2)}
          </div>
        </div>

        <details>
          <summary>${a(e,"editor_advanced")}</summary>
          <div class="hint">${a(e,"editor_hint")}</div>
          ${l}
        </details>

        <details>
          <summary>${a(e,"editor_extra_sources")}</summary>
          <div class="hint">${a(e,"editor_extra_hint")}</div>
          ${n}
        </details>
      </div>
    `,this._rendered=!0,this._syncPickers()}};var V="weather-central-card",pe="weather-central-card-editor",Ge="2026.11.0b8";customElements.get(pe)||customElements.define(pe,H);customElements.get(V)||customElements.define(V,W);window.customCards=window.customCards||[];window.customCards.some(r=>r.type===V)||window.customCards.push({type:V,name:"Weather Central Card",description:"Provider-aware weather card with source provenance, fallback chains and freshness indicators.",preview:!0});console.info("%c WEATHER-CENTRAL-CARD %c "+Ge+" ","color:white;background:#1976d2;font-weight:700","color:#1976d2;background:#fff");})();
