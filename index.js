const { Observable } = require("rxjs");
const { map, pluck } = require("rxjs/operators");
// Create Data To Emit With Observable
const users = {
	data: [
		{
			status: "active",
			age: 10,
		},
		{
			status: "inactive",
			age: 58,
		},
		{
			status: "active",
			age: 10,
		},
		{
			status: "active",
			age: 24,
		},
		{
			status: "inactive",
			age: 10,
		},
		{
			status: "inactive",
			age: 62,
		},
	],
};

// Create Observable that emits data to observers
const observable$ = new Observable((subscriber) => {
	subscriber.next(users);
}).pipe(
	pluck("data"),
	//or
	// map((value) => {
	// 	console.log("Get the data from observable$ ", value);
	// 	return value.data;
	// }),
	map((value) => {
		console.log("Get the data from the first operator", value);
		return value.filter((user) => user.status === "active");
	}),
	map((value) => {
		console.log("Get the data from the second operator", value);
		return (
			value.reduce(
				(previousValue, user) => previousValue + user.age,
				0
			) / value.length
		);
	}),
	map((value) => {
		console.log("Get the data from the third operator", value);
		if (value < 18) throw new Error("Averge age is too young");
		else return value;
	})
);

// Create an observer that receive data and handle it
const observer$ = {
	next: (value) => {
		console.log("Observer Got a value of " + value);
	},
	error: (error) => {
		console.log("Observer Got a error of " + error);
	},
	complete: () => {
		console.log("Observer Got a complete notification");
	},
};

// connect obeservable$ with observer$
observable$.subscribe(observer$);
