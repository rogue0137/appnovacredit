# Krystal Flores Nova Credit App

No need to install anything. You will be using the following link to hit all endpoints: https://appnovacredit.herokuapp.com/

## Overview
- /phase1
- /phase2
- /:id
- Strategy
- Faults
- Questions

## /phase1 
The following post will create metadata. Update `filename`, `description` and `tags` as you like.
```
curl -X POST \
  http://appnovacredit.herokuapp.com/files/phase1 \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: fae600de-28b3-49eb-8b9a-a3a8f026db94' \
  -H 'cache-control: no-cache' \
  -d '{
	"filename": "nova_credit_report_2019.tsv",
	"description": "Krystal Flores'\''s Mexican Credit Report",
	"tags": [ "Krystal", "Flores", "Mexico", "Credit"]
}'
```
On successful post, you will get a response similar to the following with the `filename` and `id` relevant to what you have posted:
```
"Success: nova_credit_report_2019.tsv metadata has been assigned the ID 2"
```

## /phase2
The following post will use the metadata from the `phase1` endpoint. Update `requestingBank` and `file` as you see fit. Make sure to put the correct pathway for whatever filename you are using. 
```
curl -X POST \
  https://appnovacredit.herokuapp.com/files/phase2 \
  -H 'Postman-Token: 2c1d5f31-3066-4b4c-bcdb-da2442bacae4' \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F file=@/Users/krystalflores/Documents/nova_credit_report_2019.tsv \
  -F requestingBank=EWB
```
On successful post, you will get a response similar to the following with the `filename` and `id` relevant to what you have posted:
```
"Success: nova_credit_report_2019.tsv has been assigned the ID 2"
```

## /:id
The following gets information about the file using the file ID while the file exists. Replace 1 with the number of any file ID you know has been created.
```
curl -X GET \
  https://appnovacredit.herokuapp.com/files/data/1 \
  -H 'Postman-Token: b64a2da6-7ee2-4178-aa3e-a6e9ed2ea72c' \
  -H 'cache-control: no-cache'
```
On successful post, you will get a response similar to the following with the appropriate information reflective of the file and metadata you have previously uploaded with that ID.
```
{
    "id": 1,
    "filename": "nova_credit_report_2019.tsv",
    "description": "Krystal Flores's Mexican Credit Report",
    "tags": [
        "Krystal",
        "Flores",
        "Mexico",
        "Credit"
    ],
    "ext": "tsv",
    "requestingBank": "EWB",
    "size": 17,
    "type": "text/tab-separated-values",
    "filepath": "novaCredit/nova_credit_report_2019.tsv",
    "createdAt": "2019-11-18T06:10:00.584Z",
    "updatedAt": "2019-11-18T06:10:00.584Z"
}
```


## Strategy

I am a big fan of minimum viable products. My thoughts are: *What is the simplest most efficient way to give the stakeholders what they want? And if time permits, how can I make the MVP more robust?*

`Express` is an incredibly quick way to create a Node app. I am using `Sequelize` as the ORM because it is also easy and fast.
I am using `PostgreSQL` because it is familiar. However, the most important module used in this app is `express-formidable`. 
It enables one to quickly take in files, fields, and get relevant metadata such as file size, type, etc. Otherwise, this is a very basic app. It employs the normal conventions for node apps with regards to using `bin/www`, routes, controllers, models, etc. For the purpose I of this exercise, I have left out views. 

## Faults 

This truly is a very MVP app. With more time I would have addressed the following:
- Better error handling
- Simple form view 
- Simple response views 

## Questions
1. I typically handle dependencies for a file by using npm and package.json. Together, they're a great tool.  
2. My top three favorite resources are:
    1. Dan Bader of [dbader.org](https://dbader.org/) and [realpython.com](https://realpython.com/) because when I was first learning how to code, he made coding an attainable goal. He and his staff write clear, short, engaging tutorials. I am fond of Python because of the tips and tricks Dan taught me. Even though I rarely use Python professionally now, Dan's websites are still great places to go to when I want a quick endorphin learning rush.
    2. Youtube is one of my favorite mediums because I learned to code from CodeSchool.org videos. Yes, all their content was videos! Now, when I'm looking at an unfamiliar concept or refreshing an old one, I go to the documentation and videos. I really enjoy conference talks and anyone who takes a demystifying approach to what many consider a hard topic. 
    3. I was introduced to [On Being a Senior Engineer](https://www.kitchensoap.com/2012/10/25/on-being-a-senior-engineer/) by the VP of Engineering at Nordstromrack.com|HauteLook, Herman Radtke. It is one thing to be able to code well. It is another to be a mature engineer. I regularly reread this article to challenge myself to grow in different ways. 
3. I would write many tests for a piece of code that requires access to a remote database
   through a network connection. I would check the schema. I would make sure I understand the assumptions about this data and then confirm/correct these assumptions. If we get charged per ping of this data store, I would have to pull some initial data to seed an on premise DB that I could use in initial testing. 

 
