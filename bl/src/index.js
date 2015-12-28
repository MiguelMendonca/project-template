/*Imports here*/

var requests = require('./JFiles/requests.json');
var patients = require('./JFiles/patients.json');
var actsrverb = require('./JFiles/acts-rmb-verbose.json');
var actsr = require('./JFiles/acts-rmb.json');
var acts = require('./JFiles/acts.json');
var doctors = require('./JFiles/doctors.json');
var reports = require('./JFiles/reports.json');

/*Initializing next request and report IDs*/

var maxreq = 0;
var maxrep = 0;

	for(var i = 0; i<requests.length; i++) {
		if( requests[i].reqID > maxreq) {
			maxreq = requests[i].reqID;
		}
		if( requests[i].repID > maxrep) {
			maxrep = requests[i].repID;
		}
	}


/*Business logic starts here*/

exports = module.exports


exports.sayHello = function (name) {
  return 'Hello ' + (name || 'World')
}

exports.login = function (username, password) {
	for(i=0;i<doctors.length;i++){
		if(username == doctors[i].user && password == doctors[i].pass){
			return [true, doctors[i]];
		}
	}
		return [false, ''];
	}

exports.postreqs = function (dID){

	var reportList = [];
	var requestList = [];
	for (var i=0; i<reports.length; i++) {
		if (reports[i].docID == dID) {
			reportList.push(reports[i]);
		}
	}
	for (var i=0; i<reportList.length; i++) {
		for (e=0; e<requests.length; e++){
			if (reportList[i].repID == requests[e].repID) {

				var actinfo = ['', 0];
				for(j=0; j<acts.length; j++){
					if(acts[j].actID == reportList[i].actID) {
						actinfo = [acts[j].name, acts[j].cost];
					}
				}
				var patientName = '';
				for(k=0; k<patients.length; k++){
					if(patients[k].patID == reportList[i].patID) {
						patientName = patients[k].name
					}
				}
				requestList.push({ 
					reqID : requests[e].reqID, repID: requests[e].repID, date: reportList[i].date,  patID: patientName, actName: actinfo[0], 
					cost: actinfo[1], actual_reimb: reportList[i].actual_reimb_perc, status: requests[e].status
				});
			}
		}
	}
	return requestList;
}

exports.postpats = function(dID){
	var patientList = [];

	for(i=0; i<reports.length; i++) {
		if(reports[i].docID == dID){
			for(e=0; e<patients.length; e++){
				if(patients[e].patID == reports[i].patID) {
					var newElement = true;
					for (j=0; j<patientList.length; j++) {
						if(patientList[j].patID == patients[e].patID){
							newElement = false;
						}
					}
					if(newElement){
						patientList.push(patients[e]);
					}
				}
			}
		}
	}
	return patientList;
}

exports.selp = function(policytype) {

	for( var i=0;i<actsr.length;i++){
			if(actsr[i].policy_type === policytype){
				return actsrverb[i].policy_type;
			}
		}
}

exports.acts = function(){
	return acts;
}

exports.reimburse = function(actID, policytype){

	for(i=0; i< actsr.length; i++){
		if(actID == actsr[i].actID && policytype == actsr[i].policy_type){
			return actsr[i].reimb_percentage;
		}
	}
	return false;
}

exports.updatereq = function(RList, dID, pID) {

	for(var i=0; i < RList.length; i++) {
		RList[i].reqID = maxreq +1;
		RList[i].repID = maxrep +1;
		maxreq++;
		maxrep++;
	}

	for(var i=0; i < RList.length; i++) {
		
		requests.push({
			reqID: RList[i].reqID, repID: RList[i].repID, status: RList[i].status
		});
		var aID = 0;
		for(var e=0; e < acts.length; e++) {
			if(acts[e].name == RList[i].actName) {
				aID = acts[e].actID;
			}
		}
		reports.push({
			repID: RList[i].repID, date: RList[i].date, docID: dID, patID: pID, actID: aID, actual_reimb_perc: RList[i].actual_reimb
		});

	return RList;

}}