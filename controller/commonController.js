module.exports.jsonResponse = (res, status, data) => {
    finalresultjson = {};
    finalresultjson.status = status;
    finalresultjson.data = data;
    res.json(finalresultjson);
    res.end();
    return false;
}