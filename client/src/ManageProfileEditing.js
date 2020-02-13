// import { Component } from "react";
// import { Redirect } from 'react-router-dom';
// import axios from 'axios';

// export default class ManageProfileEditing extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             redirectToEditProfile: false,
//             profileFORedit: [],
//             profileOwner: [],
//             id: ''
//         }
//     }

//     getProfileOwner = () => {
//         axios
//             .get(`/users/${localStorage.user}`)
//             .then(res => {
//                 if (res.status === 200) {
//                     this.setState({ profileOwner: res.data })
//                 } else {
//                     console.log(`error statuse code : ${res.status}`);
//                 }
//             }).catch(err => {
//                 console.log(err);
//             })
//     }
//     getProfileForEdit = (id) => {
//         let tempProfile = [...this.state.profileOwner];
//         for (let i = 0; i < tempProfile.length; i++) {
//             const element = tempProfile[i];
//             if (element._id === id) {
//                 this.setState({ profileFORedit: element });
//                 this.setState({ id: id });
//             }
//         }
//     }

//     render() {
//         if (this.state.redirectToEditProfile) {
//             return <Redirect to={{
//                 pathname: '/editProfile',
//                 state: {id:this.state.id, editProfille: this.state.profileFORedit}
//             }} />
//         }

//         return(
//             <div>
//                 {this.state.profileOwner.map((user,i) => {

//                 })}
//             </div>
//         )
//     }
// }