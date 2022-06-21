const errorTracking = (message) => {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "https://hooks.zapier.com/hooks/catch/10595435/bat6no6/",
    true
  );
  xhr.send(
    JSON.stringify({
      message: message,
    })
  );
};

function set_tracking_cookie(queryParam, value) {
  try {
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
  } catch (err) {
    errorTracking(`Error in set_tracking_cookie -->\n${err}`);
  }
}

function getParameterByName(name) {
  try {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null
      ? null
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  } catch (err) {
    errorTracking(`Error in getParameterByName -->\n${err}`);
  }
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

const isInViewport = function (elem) {
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

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const makeCalendlyUrl = (base_url) => {
  let url = `${base_url}&hide_gdpr_banner=1&hide_event_type_details=1&hide_landing_page_details=1`;

  try {
    $(function () {
      if ($("#iframe-inject-cal").length) {

        let name = getTrackingId('name');

        if (name === "null") {
          name = getTrackingId('fullname');
        }

        if (name === "null") {
          name = '';
        }

        let email = getTrackingId('email');
        if (email === 'null') {
          email = '';
        }

        let linkInject = {
          utm_source: getTrackingId('utm_source'),
          utm_medium: getTrackingId('utm_medium'),
          utm_campaign: getTrackingId('utm_campaign'),
          utm_content: getTrackingId('utm_content'),
          name: name,
          email: email
        };

        for (const key in linkInject) {
          url += `&${key}=${linkInject[key]}`;
        }
        console.log(url);

        $("#iframe-inject-cal").attr("src", url);
      }
    });
  } catch (err) {
    errorTracking(`Error in makeCalendlyUrl -->\n${err}`);
    docReady(function () {
      document.getElementById("iframe-inject-cal").src = url;
    });
  }
};

const delayedCta = (timeout = 3000) => {
  try {
    $(function () {
      let hiddenCta = $(".hidden-cta");
      hiddenCta.hide();

      if (hiddenCta.hasClass("hidden")) {
        hiddenCta.removeClass("hidden");
      }
      setTimeout(function () {
        console.log("hidden CTA Runs");
        hiddenCta.fadeIn(2000);
      }, timeout);
    });
  } catch (err) {
    console.log(err);
    errorTracking(`Error in delayedCta -->\n${err}`);
    docReady(function () {
      let hiddenCta = document.querySelector(".hidden-cta");
      console.log(hiddenCta);

      setTimeout(function () {
        hiddenCta.classList.remove("hidden");
        console.log("passed hidden");
        hiddenCta.style.display = null;
      }, timeout);
    });
  }
};

function getTrackingId(id) {
  if (Cookies.get(id)) {
    if (
      Cookies.get(id) !== null ||
      Cookies.get(id) !== "" ||
      Cookies.get(id) !== "null"
    ) {
      return Cookies.get(id);
    }
  } else {
    return getParameterByName(id) || "null";
  }
}

function docReady(fn) {
  if (document.readyState != "loading") {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState != "loading") fn();
    });
  }
}

docReady(function () {
  try {
    let source = getParameterByName("utm_source");
    let medium = getParameterByName("utm_medium");
    let campaign = getParameterByName("utm_campaign");
    let content = getParameterByName("utm_content");
    let agent_id = getParameterByName("agent_id");
    let email = getParameterByName("email");
    let user_name =
      getParameterByName("name") || getParameterByName("fullname");
    let phone = getParameterByName("phone");

    if (user_name) {
      if (user_name.indexOf(" ") >= 0 || user_name.indexOf("+") >= 0) {
        let nameString = user_name.replace("+", " ").split(" ");
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
  } catch (err) {
    errorTracking(`Error in start function -->\n${err}`);
  }
});
