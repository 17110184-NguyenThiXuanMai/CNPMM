// import axios from 'axios';

// const ROOMTYPE_API_BASE_URL = "http://localhost:8080/api/test/roomtypes";

// class RoomTypeService {

//     getRoomTypes(){
//         return axios.get(ROOMTYPE_API_BASE_URL);
//     }

//     createRoomScreen(roomType){
//         return axios.post(ROOMTYPE_API_BASE_URL, roomType);
//     }

//     getRoomTypeById(roomTypeId){
//         return axios.get(ROOMTYPE_API_BASE_URL + '/' + roomTypeId);
//     }

//     updateRoomType(roomType, roomTypeId){
//         return axios.put(ROOMTYPE_API_BASE_URL + '/' + roomTypeId, roomType);
//     }

//     deleteRoomType(roomTypeId){
//         return axios.delete(ROOMTYPE_API_BASE_URL + '/' + roomTypeId);
//     }
// }

// export default new RoomTypeService()