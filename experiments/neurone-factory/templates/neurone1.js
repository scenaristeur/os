// https://json-ld.org/playground/#startTab=tab-compacted&json-ld=%7B%22%40context%22%3A%7B%22base%22%3A%22https%3A%2F%2Fscenaristeur.github.io%2Fverbhse%23%22%2C%22ve%22%3A%22https%3A%2F%2Fscenaristeur.github.io%2Fverse%23%22%2C%22id%22%3A%22%40id%22%2C%22type%22%3A%22%40type%22%7D%2C%22ve%3Aname%22%3A%22Application%20Verse%22%2C%22ve%3Aage%22%3A%22-5%22%2C%22ve%3Aproperties%22%3A%5B%7B%22ve%3Aname%22%3A%22Am%C3%A9lioration%22%2C%22ve%3Avalues%22%3A%5B%7B%22ve%3Avalue%22%3A%22Trier%20par%20%C3%A2ge%22%2C%22ve%3Atype%22%3A%22text%22%7D%2C%7B%22value%22%3A%22Afficher%20le%20nombre%20de%20texte%2Flien%2Fnodes%20sur%20la%20pr%C3%A9sentation%20accueil%20%22%2C%22type%22%3A%22text%22%7D%2C%7B%22value%22%3A%22Aligner%20la%20saisie%20du%20champ%20texte%20%C3%A0%20droite%20car%20le%20dernier%20mot%20est%20cach%C3%A9%22%2C%22type%22%3A%22text%22%7D%2C%7B%22value%22%3A%22Supprimer%20la%20saisie%20pr%C3%A9dictive%20sur%20le%20nom%20car%20la%20liste%20cache%20le%20clavier%20en%20%F0%9F%93%B1%20mobile%22%2C%22type%22%3A%22text%22%7D%2C%7B%22value%22%3A%22Modifier%20la%20propri%C3%A9t%C3%A9%20%C3%A2ge%20en%20priorit%C3%A9%20%3F%20%E2%9D%93%22%2C%22type%22%3A%22text%22%7D%2C%7B%22value%22%3A%7B%22name%22%3A%22Documentation%22%2C%22href%22%3A%22https%3A%2F%2Fgithub.com%2Fscenaristeur%2Fverse%22%7D%2C%22type%22%3A%22link%22%7D%2C%7B%22value%22%3A%7B%22name%22%3A%22Application%22%2C%22href%22%3A%22https%3A%2F%2Fscenaristeur.github.io%2Fverse%22%7D%2C%22type%22%3A%22link%22%7D%2C%7B%22value%22%3A%22Possibilit%C3%A9%20de%20supprimer%2C%20modifier%2C%20d%C3%A9placer%20les%20propri%C3%A9t%C3%A9s%22%2C%22type%22%3A%22textarea%22%7D%2C%7B%22value%22%3A%22Ajouter%20des%20workspaces%5CnCorrespondant%20au%20folder%20%F0%9F%93%81%20solid%22%2C%22type%22%3A%22textarea%22%7D%2C%7B%22value%22%3A%22Ajouter%20la%20fonction%20de%20tri%20des%20propri%C3%A9t%C3%A9s%20et%20des%20values%20dans%20les%20propri%C3%A9t%C3%A9s%22%2C%22type%22%3A%22text%22%7D%2C%7B%22value%22%3A%22Trier%20par%20%C3%A2ge%20%2C%20c'est%20fait%20et%20supprimer%20la%20saisie%20auto%20aussi%22%2C%22type%22%3A%22text%22%7D%2C%7B%22value%22%3A%22Sur%20mustupdate%2C%20lister%20les%20propri%C3%A9t%C3%A9s%2Fvalues%20qui%20diff%C3%A8rent%22%2C%22type%22%3A%22text%22%7D%2C%7B%22value%22%3A%22Deux%20groupes%20pour%20chaque%20thing%20%3A%20%5Cn-%20propri%C3%A9t%C3%A9s%20intrins%C3%A8ques%20%2C%20properties%5Cn-%20relations%20avec%20les%20autres%20thing%20%2C%20relation%5Cn-%20en%20plus%20des%20m%C3%A9tas%22%2C%22type%22%3A%22textarea%22%7D%2C%7B%22value%22%3A%22Ajouter%20la%20possibilit%C3%A9%20d'archiver%20sur%20la%20valeur%20d'une%20propri%C3%A9t%C3%A9%2C%20ou%20de%20lui%20ajouter%20un%20%C3%A2ge%2F%20statut%22%2C%22type%22%3A%22text%22%7D%5D%7D%5D%2C%22id%22%3A%22093e99bd-460a-4d69-8120-be3cc8ce2975%22%2C%22ve%3Acreated%22%3A1637614177915%2C%22ve%3Aupdated%22%3A1642665646223%2C%22ve%3Aurl%22%3A%22https%3A%2F%2Fspoggy-test5.solidcommunity.net%2Fpublic%2Fneurones%2F093e99bd-460a-4d69-8120-be3cc8ce2975%22%2C%22ve%3Asynchronized%22%3A1642665646224%2C%22ve%3Atype%22%3A%22node%22%7D&context=%7B%7D

export default
{
  "@context": {
    "as": "https://www.w3.org/ns/activitystreams#",
    "ve": "https://scenaristeur.github.io/verse#",
    "id": "@id",
    "type": "@type",
    "name": "ve:name",
    "age": "ve:age",
    "url": "ve:url",
    "privacy": "ve:privacy",
    //"type": "ve:type",
    "properties": "ve:properties",
    "links": "ve:links",
    "synapses": "ve:synapses",
    "created": "ve:created",
    "updated": "ve:updated",
    "synchronized": "ve:synchronized"
  },
  "id": null,
  "name": "" ,
  "age": 0 ,
  "url": "",
  "privacy": 'private',
  "type": null,
  "properties": [],
  "links": [],
  "synapses": [],
  "created": null,
  "updated": null,
  "synchronized": null,
}
