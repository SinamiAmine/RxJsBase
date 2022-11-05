Rxjs Exemple : 
-------------
     1- Initialise a node project by typing command npm init -y
	 2- Create index.js
	 3- install rxjs npm install rxjs
	 4- Create Observable (Observale is a class)
	 const observable$ = new Observable((subscriber)=> {
	      subscriber.next(10);
	 })
	 5- Create Observer 
	  const observer$ = {
				next : (value) => {console.log("Observer Got a value of " + value);},
				error : (error) => {console.log("Observer Got a error of " + error);},
				complete : () => {console.log("Observer Got a complete notification);}
	  }
	 6- connect observer and observable observable$.subscribe(observer$)
	 7- run app with node index
	 8- Pipes
	       1- Create data to emit
		       const users = {
					data : [
						{ 
							status : "active",
							age : 22
						} , ...
					]
			   }
	        2- Create Observable (Observale is a class)
				const observable$ = new Observable((subscriber)=> {
							subscriber.next(users);
				})
			3- Transform data with operators RxJs
				const observable$ = new Observable((subscriber)=> {
							subscriber.next(users);
				}).pipe(
					map((value)=>{
						console.log("Get the data from observable$ ",value);
						return value.data;
					}),
					map((value)=>{
						console.log("Get the data from the first operator",value);
						return value.filter(user=>user.status === "active");
					}),
						map((value)=>{
						console.log("Get the data from the second operator",value);
						return value;
					}),
					
				)