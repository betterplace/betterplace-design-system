import fetchTokens from './lib/fetch_tokens'
fetchTokens(process.argv[2]).then(console.log)
