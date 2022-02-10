import traits from "../../database/traitsTheArtOfOri.json";

export default function personHandler({ query: { id } }, res) {
  const lenTraits = traits.length
  const trait = traits[parseInt(id)-1]
  let queryId = parseInt(id)
  res.statusCode = 200
  if(queryId <= lenTraits){
    res.json(trait)
  }else{
    res.json({error: 'There is no data corresponding your query. The length of Traits is ' + lenTraits})
  }
}