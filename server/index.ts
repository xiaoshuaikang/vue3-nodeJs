import express, { type Express, Router, type Request, type Response } from 'express'

import axios from 'axios'

import { geoCoordMap, oilPrice, type OilPriceType } from '../src/assets/geoMap'

const app: Express = express()
app.use('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

const router: Router = Router()

app.use('/api', router)

router.get('/list', async (req: Request, res: Response) => {
  // const result = await axios.post(
  //   'http://apis.juhe.cn/gnyj/query',
  //   { key: '1af201a3a587e99ac6acb2a51fce0feb' },
  //   {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   }
  // )
  const getOilPrice = new Promise(
    (resolve: (value: { name: string; value: Array<number> }[]) => void, reject) => {
      const mapData: { name: string; value: Array<number> }[] = oilPrice.map((idx) => {
        idx.punctuationAddress = geoCoordMap[idx.city]
        return {
          name: idx.city,
          value: idx.punctuationAddress,
          '92h': idx['92h'],
          '95h': idx['95h'],
          '98h': idx['98h'],
          '0h': idx['0h']
        }
      })
      console.log(mapData)
      resolve(mapData)
    }
  )
  const result = await Promise.all([getOilPrice])
  res.json({
    data: result[0]
  })
})

app.listen(3333, () => {
  console.log('success server http://loclahost:3333')
})
