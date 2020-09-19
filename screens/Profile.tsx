// function Profile() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.avatarContainer}>
//         <View style={styles.profileBioView}>
//           <Text style={styles.profileName}>Paula Sullivan</Text>
//           <Text style={styles.profileLiner}>100 Followers • 150 Following</Text>
//           <Text style={styles.profileHandle}>@paula_sullivan</Text>
//         </View>
//         <View style={styles.avatarPhoto}>
//           <Avatar
//             size="large"
//             rounded
//             source={{
//               uri:
//                 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
//             }}
//             onPress={() => {
//               console.log('avatar pressed');
//             }}
//           />
//         </View>
//       </View>
//       <ProfileTopTab.Navigator>
//         <ProfileTopTab.Screen name="On Display" component={ProfileOnDisplay} />
//         <ProfileTopTab.Screen name="Posts" component={ProfilePosts} />
//         <ProfileTopTab.Screen name="Style" component={ProfileStylePosts} />
//       </ProfileTopTab.Navigator>
//     </View>
//   );
// }
