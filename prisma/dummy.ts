import { PrismaClient } from '@prisma/client'
import dummyData from './dummy.json'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.tag.createMany({
    data: [
        { title: "reader" },
        { title: "slide" },
        { title: "front" },
        { title: "forward" },
        { title: "canal" },
        { title: "negative" },
        { title: "hunt" },
        { title: "curve" }
    ]
  })

  await prisma.project.createMany({
    data: [
        {
            title: "uUTBmjlImeBPVbGYQX",
            description: "thus dawn current ready chest wet usual newspaper drew fog everyone white young using pipe build become gold from pan arrange common tomorrow how",
            links: [
                "http://haecvo.fj/oruuwmep",
                "http://ejemotno.pa/igidiz",
                "http://etracpo.jo/ji",
                "http://budtudoki.vg/um",
                "http://he.uk/bumdu"
            ]
        },
        {
            title: "TzRwWobcIXYFPvf",
            description: "camera tight older product blood population exact force limited shaking breakfast express bell information man mission should well thousand yesterday describe rose idea wall",
            links: [
                "http://vid.mg/datis",
                "http://ejkar.lt/tociwfar",
                "http://wo.ug/otobucpa",
                "http://homicu.va/law",
                "http://lozim.tr/heuzes"
            ]
        },
        {
            title: "EnpSkQrLbaVG",
            description: "examine birth now habit flew bent excellent region letter silence allow development finest charge lift represent late luck helpful water create tight army dinner",
            links: [
                "http://vewhaktu.ht/ipu",
                "http://ezi.gh/atmouge",
                "http://vudzabuv.ms/lajcav",
                "http://kavi.kw/get",
                "http://usip.sd/ge"
            ]
        },
    ]
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })

  console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
