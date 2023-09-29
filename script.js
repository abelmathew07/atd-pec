var g=document.getElementById('studentName')
console.log(g)
const usersRef = ref.child('users');
usersRef.set({
  alanisawesome: {
    date_of_birth: 'June 23, 1912',
    full_name: 'Alan Turing'
  },
  gracehop: {
    date_of_birth: 'December 9, 1906',
    full_name: 'Grace Hopper'
  }
});

