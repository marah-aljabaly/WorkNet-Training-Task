const key = 'ea758b4bfa5142eedc3d6a8d161b21e9';
fetch (`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`)
.then(res => res.json())
.then(da => {console.log(da); console.log(da.results[0])});
