//file_manager library functions
var fileManager = require('./file_manager');

var sensorFileName = "sensors.json";

module.exports.addSensor = function(sensorId, sensorName, patientId, dataType, unit) {
    fileManager.initialiseJsonFile(sensorFileName);

    var jsonToSerialise = {
        'sensorId' : sensorId,
        'value' : { 
            'name' : sensorName, 
            'patientID' : patientId, 
            'dataType' : dataType, 
            'unit' : unit
        }
    }
    fileManager.readJsonFromFile(sensorFileName, function(error, jsonObject) {
        if (error) { 
            console.log(error);
        }
        else {
            jsonObject.push(jsonToSerialise);
            fileManager.writeJsonToFile(jsonObject, sensorFileName, function(error) {
                if (error) {
                    console.log(error);
                }
            });
        }
    });
}


module.exports.deleteSensor = function(sensorId) { 
    fileManager.readJsonFromFile(sensorFileName, function(error, jsonObject) {
        if (error) {
            console.log(error);
        } else {
            var index = jsonObject.map(function(element) {
                return(element.sensorId);
            }).indexOf(sensorId);
            jsonObject.splice(index, 1);
            fileManager.writeJsonToFile(jsonObject, sensorFileName, function(error) {
                if (error) {
                    console.log(error);
                }
            });
        }
    });
}