import { database } from "../Firebase";

const db = database.ref('/MonitoringDebitQualityApp/MonitoringDebit');
const dblocation =  database.ref('MonitoringDebitQualityApp')
const dbh= database.ref('MonitoringDebitQualityApp')
const monitoring = database.ref('MonitoringDebitQualityApp')
const Ews = database.ref('ewsApp')
class CrudHandler{

    getEws(){
        return Ews
    }
    getAll(){
        return db;
    }
    getMonitor(){
        return monitoring;
    }
    getLocation(){
        return dblocation;
    }
    getHistory(){
        
        
        return dbh 
        
    }
    create(key1,key2,data){
        const dataSet = database.ref('ewsApp').child(key1).child(key2).update(data)
        return  dataSet
    }
    update(key1,key2, value){
        return dbh.child(key1).child(key2).child('Submitted').update(value)
    }
    historycal(value){
        return dbh.push(value);
    }

    delete(key) {
        return db.child(key).remove();
      }

}
export default new CrudHandler();