CREATE TABLE person (
    pid varchar NOT NULL,
    password varchar NOT NULL,
    name varchar NOT NULL,
    email varchar NOT NULL,
    phone varchar NOT NULL,
    age int NOT NULL,
    gender varchar NOT NULL,
    PRIMARY KEY (pid)
  );

CREATE TABLE listings (
    bid int NOT NULL,
    pid varchar NOT NULL,
    FOREIGN KEY(bid) REFERENCES booking(bid),
    FOREIGN KEY(pid) REFERENCES person(pid)
  );

CREATE TABLE `booking` (
	`bid` int NOT NULL,
	`etd` DATETIME NOT NULL,
	`start_dest` varchar NOT NULL,
	`final_dest` varchar NOT NULL,
	`cab_type` varchar NOT NULL,
	`cur_num` int NOT NULL,
	`max_num` int NOT NULL,
	PRIMARY KEY (`bid`)
);



