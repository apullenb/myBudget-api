
CREATE TABLE IF NOT EXISTS "user"
(
 user_id    integer NOT NULL GENERATED BY DEFAULT AS IDENTITY (
 start 548264648
 ),
 first_name text NOT NULL,
 user_name  character varying(150),
 password   character varying(150) NOT NULL,
 CONSTRAINT PK_users PRIMARY KEY ( user_id )
);




