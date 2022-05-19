function set_tracking_cookie(queryParam, value) {
  if (value) {
    if (
      Cookies.get(queryParam) == null ||
      Cookies.get(queryParam) == "" ||
      Cookies.get(queryParam) == "null"
    ) {
      let root = location.hostname
        .split(".")
        .reverse()
        .splice(0, 2)
        .reverse()
        .join(".");
      console.log("root domain", root);
      Cookies.set(queryParam, value, { expires: 365, domain: root });
    }
  }
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function get_tracking_cookies() {
  let params = new URLSearchParams({});
  if (Cookies.get("utm_source")) {
    params.append("utm_source", Cookies.get("utm_source"));
  }
  if (Cookies.get("utm_medium")) {
    params.append("utm_medium", Cookies.get("utm_medium"));
  }
  if (Cookies.get("utm_campaign")) {
    params.append("utm_campaign", Cookies.get("utm_campaign"));
  }
  if (Cookies.get("utm_content")) {
    params.append("utm_content", Cookies.get("utm_content"));
  }
  if (Cookies.get("agent_id")) {
    params.append("agent_id", Cookies.get("agent_id"));
  }
  if (Cookies.get("email")) {
    params.append("email", Cookies.get("email"));
  }
  if (Cookies.get("name")) {
    params.append("name", Cookies.get("name"));
  }
  if (Cookies.get("phone")) {
    params.append("phone", Cookies.get("phone"));
  }
  return params;
}

var isInViewport = function (elem) {
  var offset = 600;
  var bounding = elem.getBoundingClientRect();

  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight + offset ||
        document.documentElement.clientHeight + offset) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

let source = getParameterByName("utm_source");
let medium = getParameterByName("utm_medium");
let campaign = getParameterByName("utm_campaign");
let content = getParameterByName("utm_content");
let agent_id = getParameterByName("agent_id");
let email = getParameterByName("email");
let user_name = getParameterByName("name");
let phone = getParameterByName("phone");

if (user_name) {
  if (user_name.indexOf(" ") >= 0) {
    let nameString = user_name.split(" ");
    set_tracking_cookie("first-name", nameString[0]);
    set_tracking_cookie("last-name", nameString.slice(1).join(" "));
  }
}

set_tracking_cookie("utm_source", source);
set_tracking_cookie("utm_medium", medium);
set_tracking_cookie("utm_campaign", campaign);
set_tracking_cookie("utm_content", content);
set_tracking_cookie("agent_id", agent_id);
set_tracking_cookie("email", email);
set_tracking_cookie("name", user_name);
set_tracking_cookie("phone", phone);
