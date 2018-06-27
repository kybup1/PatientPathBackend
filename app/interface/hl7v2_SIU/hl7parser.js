/* author: gfels6
** HL7 Reader/Interface for the Klinik Höheweg
** Read in HL7 V2 SIU Messages, parsing them and save into the db.
** todo: check if S12 (new appointment) or S14 (change appointment, not implemented)
** todo: calculate endDate
*/

module.exports = {
    readHL7Messages: function () {

    const parser = require('@rimiti/hl7-object-parser')
    const db = require("../../models/index");
    const s12Mapping = require('./s12.json');
    const fs = require('fs');

    // Hardcoded institution id from Klinik Höheweg
    const institutionId = 2;
    
    // Path for the unread HL7 messages
    const pathNew = 'C:/PatientPathBackend/messages/hoehewegKIS/new';
    const pathDone = 'C:/PatientPathBackend/messages/hoehewegKIS/done';

    // readFile call for every hl7 message
    fs.readdir(pathNew, function(err, items) {
        console.log(items);
     
        for (let i=0; i<items.length; i++) {
            readFile(items[i]);
        }
    });

    // message get parsed and saved into the db
    // the txt file will moved to the 'done' folder
    readFile = (fileName) => {
        fs.readFile(pathNew+"/"+fileName, 'utf8', function(err, data) {  
            if (err) throw err;
            //\n has to be deleted, because the parser only needs the \r
            s12Message = data.replace(/(\n|\n)/gm,"");
    
            const obj = parser.decode(s12Message, s12Mapping);

            //convert Date to a db-readable date
            const convBirthdate = convertTime(obj.pid.birthdate, "birthdate");
            const isoBirthDate = new Date(convBirthdate).toISOString();
            
            //convert Startdate to a db-readable date and calculates the timezone
            const convStartdate = new Date(convertTime(obj.sch.datetime,"standard"));
            const hoursToChange = convStartdate.getTimezoneOffset()/-60;
            convStartdate.setHours((convStartdate.getHours()+hoursToChange),0,0,0);

            //mapping from the patient from the hl7 message to the patient in the db
            //if the patient exists, add the appointment and move the hl7 file
            db.patient.find({
                where : {"firstname" : obj.pid.first_name, "lastname" : obj.pid.last_name, "birthdate" : isoBirthDate}
            })
            .then(patient => {
                db.appointment.create({
                    "name" : obj.sch.type,
                    "description" : obj.nte.comment,
                    "startdate" : convStartdate,
                    "enddate" : convStartdate,
                    "patid" : patient.patid,
                    "episodeid": 1,
                    "instid" : institutionId,
                    "practid" : 2,
                    "modified" : true,
                    "changerequest" : false
                })
            }).then(
                fs.rename(pathNew+"/"+fileName, pathDone+'/'+fileName, (err) => {
                    if (err) throw err;
                    console.log('Rename complete!');
                })
            )
            .catch(err => {
                console.log(err);
            })
            .done(); 
        }); 
    }

    //convert HL7 date to db-readable date 
    convertTime = (dateString, typ) => {
        let day,month,year,hour,minute;
        year = dateString.slice(0,4);
        month = dateString.slice(4,6);
        day = dateString.slice(6,8);
        hour = dateString.slice(8,10);
        minute = dateString.slice(10,12);
        
        if(typ == "birthdate"){
            return year + "-" + month + "-" + day;
        }
        
        if(typ == "standard"){
            return year + "-" + month + "-" + day + " " + hour + ":" + minute;
        }
    }

}
}