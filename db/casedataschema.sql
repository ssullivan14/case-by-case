DROP DATABASE IF EXISTS casedata;

CREATE DATABASE casedata;

USE casedata;

CREATE TABLE person_missings (
item_id INTEGER AUTO_INCREMENT NOT NULL,

Current_Age_From INTEGER NOT NULL,

City_Of_Last_Contact VARCHAR(100),

First_Name VARCHAR(15),

Modified_Date_Time DATETIME,

Middle_Name VARCHAR(15),

Last_Name VARCHAR(25),

img VARCHAR(255),

Current_Age_To INTEGER,

Computed_Missing_Max_Age INTEGER,

Computed_Missing_Min_Age INTEGER,

County_Of_Last_Contact VARCHAR(100),

id_Formatted VARCHAR(15),

Race_Ethnicity VARCHAR(50),

Date_Of_Last_Contact DATE,

State_Of_Last_Contact VARCHAR(3),

Gender VARCHAR (10),

Link VARCHAR(255),

namus2Number INTEGER,

Geo_Shape VARCHAR(255),

Geo_Point_2D VARCHAR(255),

PRIMARY KEY (item_id)
);