# Krystal Flores Nova Credit App

No need to install anything. You will be using the following link to hit all endpoints: https://appnovacredit.herokuapp.com/

## Phase 1: 
The following will post will create metadata. Update `filename`, `description` and `tags` as you like.
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

## Phase 2
```

```
3. /:id