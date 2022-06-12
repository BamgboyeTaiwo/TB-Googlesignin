InitializeAuthentication();

const handlelogin = () => {
  console.log("started");
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const user = result.user;
      setuser(user);

      console.log(user);
      setLoggedin(true);
      // ...
    })
    .catch((error) => {
      console.log(error);
    });
};