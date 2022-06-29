/* 
  Called from:
    - Components/Message
  Used to:
    Give a nice format to the complex datetime object recived from firestore DB
      From: 'Timestamp(seconds=1656114346, nanoseconds=310000000)'
      To: 'Fri, 24 Jun 2022 23:45:46 GMT'
*/

const convertDate = (datetime) => {
  return new Date( datetime?.toDate() ).toUTCString();
}

export default convertDate;