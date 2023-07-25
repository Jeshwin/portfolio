const { PrismaClient } = require('@prisma/client')
const fs = require('fs-extra')

///////////////////////////////
// IMPORTANT                 //
// DO NOT RUN IN PRODUCTION  //
// ONLY FOR TESTING PURPOSES //
///////////////////////////////

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here

  // delete all previous data
  await prisma.projectImage.deleteMany({})
  await prisma.thumbnail.deleteMany({})
  await prisma.project.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.tag.deleteMany({})

  // create tags
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

  // create projects with thumbnails and gallery images
  await prisma.project.create({
    data: {
      title: "uUTBmjlImeBPVbGYQX",
      thumbnail: {
        create: { image: "6a51fae1-f0d5-5c14-8a68-f04bd71f43d7.jpg" }
      },
      description: "thus dawn current ready chest wet usual newspaper drew fog everyone white young using pipe build become gold from pan arrange common tomorrow how",
      tags: {
        connect: [
          { title: "forward" },
          { title: "slide" },
          { title: "front" }
        ]
      },
      links: [
          "http://haecvo.fj/oruuwmep",
          "http://ejemotno.pa/igidiz",
          "http://etracpo.jo/ji",
          "http://budtudoki.vg/um",
          "http://he.uk/bumdu"
      ],
      gallery: {
        create: [
          {
            image: "15bc2dec-e116-5158-a4d9-fb450202cf3b.jpg",
            description: "cowboy tape center play than tell tired longer hunter game coffee alone somewhere explanation familiar mixture highest guide wonderful may row swept peace tears"
          },
          {
            image: "5aa6dfd5-4f1c-559a-97e4-2fe307c43b50.jpg",
            description: "school inside time flower him lady market amount halfway stone terrible having under herself swung driven week interior chest quick doubt struck handle satisfied"
          },
          {
            image: "4f65e018-493f-5615-8d89-73f0c6d16d27.jpg",
            description: "see sink coming snake raw many hunter door angle living child master dig coat future aboard least rough herself short slope tone social hundred"
          }
        ]
      }
    }
  })

  await prisma.project.create({
    data: {
      title: "TzRwWobcIXYFPvf",
      thumbnail: {
        create: { image: "52d951d2-7a48-54ea-aca7-f898ee220b03.jpg" }
      },
      description: "camera tight older product blood population exact force limited shaking breakfast express bell information man mission should well thousand yesterday describe rose idea wall",
      tags: {
        connect: [
          { title: "negative" },
          { title: "hunt" },
          { title: "curve" }
        ]
      },
      links: [
          "http://vid.mg/datis",
          "http://ejkar.lt/tociwfar",
          "http://wo.ug/otobucpa",
          "http://homicu.va/law",
          "http://lozim.tr/heuzes"
      ],
      gallery: {
        create: [
          {
            image: "dfe578f0-f485-5ff7-9fbc-aca64e932e89.jpg",
            description: "kids father rocket cave bar found past fix unusual rising horn lower agree lost sort selection definition sun perhaps nobody customs being fighting nuts"
          },
          {
            image: "a40bacea-b268-54c9-af59-d8fa994ecc29.jpg",
            description: "thick land sun horse mother remember single silly freedom weather sets am account itself wonderful wait business particles national tales want anywhere teach jet"
          },
          {
            image: "6fb7c2af-ce26-5342-a988-b4f3f2418cb4.jpg",
            description: "reader chance transportation calm crop therefore student brick facing help mass month long honor magnet fort whistle city square source equipment yesterday layers massage"
          }
        ]
      }
    }
  })

  await prisma.project.create({
    data: {
      title: "EnpSkQrLbaVG",
      thumbnail: {
        create: { image: "f7f01e76-5426-5d77-ba76-ddb938f201de.jpg" }
      },
      description: "examine birth now habit flew bent excellent region letter silence allow development finest charge lift represent late luck helpful water create tight army dinner",
      tags: {
        connect: [
          { title: "reader" },
          { title: "canal" },
          { title: "negative" }
        ]
      },
      links: [
          "http://vewhaktu.ht/ipu",
          "http://ezi.gh/atmouge",
          "http://vudzabuv.ms/lajcav",
          "http://kavi.kw/get",
          "http://usip.sd/ge"
      ],
      gallery: {
        create: [
          {
            image: "f3dde60d-1456-5742-aaa6-65eabba12ed9.jpg",
            description: "ride develop our personal struggle affect yet nails motion spell observe basic no learn freedom test us popular stone name those gather laid blind"
          },
          {
            image: "42589d41-8ceb-5cba-9dea-be1ce7c2e09e.jpg",
            description: "careful lost catch sister when managed natural perfectly went tool couple gun best may surprise nails safe express man game slip material environment ice"
          },
          {
            image: "aba4d4fb-c72e-5da4-8c18-a3459a4da3c4.jpg",
            description: "under exactly experiment bent deep dog location log riding birds pour it kept whispered blow not statement met movement dinner before discuss ranch heard"
          }
        ]
      }
    }
  })

  // create posts
  await prisma.post.create({
    data: {
      title: "HDALTmFQsaouvlOC",
      tags: {
        connect: [
          { title: "front" },
          { title: "hunt" },
          { title: "curve" }
        ]
      },
      description: "sign tone exercise regular when heavy silent fair within dollar affect musical greatly lying of level universe percent taught dinner donkey spent average program",
      body: fs.readFileSync('dummy1.md', 'utf-8')
    }
  })

  await prisma.post.create({
    data: {
      title: "oufbQrTzndK",
      tags: {
        connect: [
          { title: "reader" },
          { title: "slide" },
          { title: "hunt" }
        ]
      },
      description: "deal smell selection yes generally control pale baseball name crop serious differ active morning industrial land thin object welcome completely trace week ready soap",
      body: fs.readFileSync('dummy2.md', 'utf-8')
    }
  })

  await prisma.post.create({
    data: {
      title: "NeSsFkh",
      tags: {
        connect: [
          { title: "reader" },
          { title: "slide" },
          { title: "canal" }
        ]
      },
      description: "native union pride wait shallow connected manner industry flow needs hardly arrive caught directly attempt fastened struggle composed replied hole make begun garage which",
      body: fs.readFileSync('dummy3.md', 'utf-8')
    }
  })

  const allProjects = await prisma.project.findMany({
    include: {
      tags: true,
      thumbnail: true,
      gallery: true,
    },
  })

  console.dir(allProjects, { depth: null })

  const allPosts = await prisma.post.findMany({
    include: {
      tags: true,
    },
  })

  console.dir(allPosts, { depth: null })
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
