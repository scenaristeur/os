import getStdin from 'get-stdin';



while(true){
  let string = await getStdin()
  console.log("you say ",string);
}
