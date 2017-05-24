var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var routes = require('./routes/index');
var Tasks=require('./routes/Tasks');
var app = express();
app.enable('trust proxy');

var options = {
    key: '-----BEGIN RSA PRIVATE KEY-----MIIEpQIBAAKCAQEA4tkU7vbOWrS8b8jfNxyJlInE3zmMtyjfa88SRTBDle0cMuG/szSdjFhUVxq4I7FKKv389HOq6ZTRjTrV28yDw8d4L//lydBtCA3pg8l82Al3h7rbuRtV8/xpnlb+Q+kSZUb51NncHk54xrHJWtYRcSEX3VJJ238A6qEX2xvvRKH9xvoVyXidgrAXEyhhw7vMXzaeL4wTfIQzGQk3NFVDyLyw32PHe3sZWnemaztv9pIViszTZPFCPaytK588RJmtxBRiQRqzgfmK6XRCYg/xhFExygrCBV4QWFZ+pYtnykAgd0XGAUD4MAIGrXhRBTdRIKY4h9/BOapCoR/8X0R+nwIDAQABAoIBAEzDSssmZ2PYXx+wqKA8nu3NxPoIvm5IfXo84yDYmTZFu1IYhEc/GcUhKsEjAIbLep6bvhp2fbJ3MoYJD89GIJyChlAv1vF4/zxHgOqgpwdwBKvAdpPoBSkAFDmJlJckap4s62O0qUD0KviJtupvIA3ZNfsl2mpVStka1DjH9iqRx1QYN7wVB/6okSo5HwAEmxg9MHtJlUdr/4YN2Ahvh4B9KBhL9cBXvX0Y4zvQl4tHNLfT4BsC/qlKEXCVHJNaq7Mk+k6VKWK4YVZlzgxfdsa3r220IeGmBmWZEgtl841uN4YVvTL9u7wSRhUdymMmJylDObARbWNCshu4pDIgGuECgYEA+xjK0wlmrGCDSLshadJUcZiKR9VY9OVGV6DE3bKF75Mwe1iaxoAojLOBWoy5HlNb4MDY3nA4t1Nk6KW5oZdfgdwc6jQCZTXQPAnyHqKWrF1mv7EiDUs0kHPUTsO6jioXldY3JJ1f1GBcYkFNPbX4VWX/SuyvMl6uUEHzvWF1FhECgYEA50cSZHchJNE5v5ITfZp8XMlTLbms1s1AG+HCOvucPPjPTf5UNMwF6gSQXQ+VG4jiSPph8arXY/+vYpqHwPj7/HEA0GAfMpslBlkPRtmCia8CG7CVgVmCcRBGrETzjOc2Ei5M3qGpNv+oBLmyIOKpZjCfQJbHW2ACqStwE5om2a8CgYEA+HX61MI7r5w8rC5HDOBMIK+RPS1WPdXVOgZiZwEs2Phrg9IULRFJjphdCg2va9uOUaJhthGTfYvukOrT+ZrArc3xaqoWKLIMICyzQS8fKuWtM0eCa2ccV0fWMC4rHlt2RRTYMcnrtkm3gJ4fYU37sf0glbIIVi4sDEyGc8HIyxECgYEAi56wT85LR/q3Lht1gMIeibVQba5F1XcbWLm1k/4JmBVssNz04Nq6R0hyDnw1u+WrFftx3X8RgOD+dDxt7+Vf2kot/53Ht7lJZMenHVJ6J7xrPWQhHXF3+eGliKInlcyPK/KfnVdi3D0Cpbek/Y1YTsTTnx5nQ5Z2hMIgavUItykCgYEA1ZhNr8dQXsM2B0CP2J9RWn02MHtveZQOtK+3nRubzM0H236BsWoU2Q57/le8WPuzrTIcLW5o5NAD2nmZp2kFhCDgbnmgrah23NfP2OxVGybr3C0aeI+tvmbXdu7B/907vKkFYWQjgN6bwZaYT9dWHYVh9vbPUtvML2n3FS9PEsk=-----END RSA PRIVATE KEY-----',
    cert: '-----BEGIN CERTIFICATE-----MIID8DCCAtgCCQDwa+ghHtshqjANBgkqhkiG9w0BAQsFADCBuTELMAkGA1UEBhMCWkExEDAOBgNVBAgMB0dhdXRlbmcxETAPBgNVBAcMCFByZXRvcmlhMR4wHAYDVQQKDBVUaGUgVHJhdmVsbGVyIENvbXBhbnkxGTAXBgNVBAsMEHRyYXZlbGxlci1ldmVudHMxJTAjBgNVBAMMHHRyYXZlbGxlci0xNjgxMjAuYXBwc3BvdC5jb20xIzAhBgkqhkiG9w0BCQEWFHNhYnJzb2Z0QGhvdG1haWwuY29tMB4XDTE3MDUyNDE1NTM1NloXDTE4MDUyNDE1NTM1NlowgbkxCzAJBgNVBAYTAlpBMRAwDgYDVQQIDAdHYXV0ZW5nMREwDwYDVQQHDAhQcmV0b3JpYTEeMBwGA1UECgwVVGhlIFRyYXZlbGxlciBDb21wYW55MRkwFwYDVQQLDBB0cmF2ZWxsZXItZXZlbnRzMSUwIwYDVQQDDBx0cmF2ZWxsZXItMTY4MTIwLmFwcHNwb3QuY29tMSMwIQYJKoZIhvcNAQkBFhRzYWJyc29mdEBob3RtYWlsLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOLZFO72zlq0vG/I3zcciZSJxN85jLco32vPEkUwQ5XtHDLhv7M0nYxYVFcauCOxSir9/PRzqumU0Y061dvMg8PHeC//5cnQbQgN6YPJfNgJd4e627kbVfP8aZ5W/kPpEmVG+dTZ3B5OeMaxyVrWEXEhF91SSdt/AOqhF9sb70Sh/cb6Fcl4nYKwFxMoYcO7zF82ni+ME3yEMxkJNzRVQ8i8sN9jx3t7GVp3pms7b/aSFYrM02TxQj2srSufPESZrcQUYkEas4H5iul0QmIP8YRRMcoKwgVeEFhWfqWLZ8pAIHdFxgFA+DACBq14UQU3USCmOIffwTmqQqEf/F9Efp8CAwEAATANBgkqhkiG9w0BAQsFAAOCAQEA4a153Bd5JIAVQowWdbTBaIkc138FZz8NEla8JIn4E2/PuQD6Z9ULDztqX7RIsM26MF1JP2TcdJkgLfpBiMG9xmk2Qguia2bW5gMAZQ9vcENaCx3/EAqgPwn4V162obLX9Nmxi5P97KJyK6zOSBpCUMGTAT4TKDfCvrjEij/W9IwqmPMg0ikChAWFk0G7VmJH9slcJ4iFba9jZDkQwf0/fiIPGE9WKL0CEC61wrRyUUhGuQ20lk/MivHhBjrbZ/3KqFgKH21gGjPNdlfqVA4okOWnLDusZvVAHOH3LUS3rMHZgAPete5Q4UdK4zYxO3bT9JYFwyIJqpNQ7crN+wgzXg==-----END CERTIFICATE-----'
};

app.set('options', options);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('/uploads/'));

/*app.use('/resources',express.static(__dirname + '/images'));
So now, you can use http://localhost:5000/resources/myImage.jpg to serve all the images instead of http://localhost:5000/images/myImage.jpg. */
app.use('/', routes);
app.use('/Tasks',Tasks);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
