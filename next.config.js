// next.config.js




const productRedirect = [
  {
    source: '/product/87',
    destination: '/eagle-premium-fire-resistant-safe-mc-20-c1-digital-fingerprint-sensor',
  },
  {
    source: '/product/122',
    destination: '/eagle-premium-fire-resistant-safe-ege-170-digital-key-lock-fingerprint-sensor-black',
  },
  {
    source: '/product/118',
    destination: '/eagle-premium-fire-resistant-safe-ege-130-digital-key-lock-fingerprint-sensor-red',
  },
  {
    source: '/product/117',
    destination: '/eagle-premium-fire-resistant-safe-ege-120-digital-key-lock-fingerprint-sensor-beige',
  },
  {
    source: '/product/115',
    destination: '/eagle-premium-fire-resistant-safe-ege-120-digital-key-lock-fingerprint-sensor-red',
  },
  {
    source: '/product/50',
    destination: '/safire-fire-resistant-safe-fr-20-horizontal-1-digital-1-keylock',
  },
  {
    source: '/product/85',
    destination: '/eagle-premium-fire-resistant-safe-mc-40-pr-ng-digital-fingerprint-sensor-natural-green',
  },
  {
    source: '/product/106',
    destination: '/eagle-fire-resistant-safe-es-350-digital-keylock',
  },
  {
    source: '/product/81',
    destination: '/eagle-premium-fire-resistant-safe-mc-20-pr-hg-digital-fingerprint-sensor-hairline-grey',
  },
  {
    source: '/product/74',
    destination: '/eagle-fire-resistant-safe-yes-031dk-digital-key-lock-black',
  },
  {
    source: '/product/101',
    destination: '/eagle-fire-resistant-safe-ss-100-2-keylock',
  },
  {
    source: '/product/77',
    destination: '/eagle-fire-resistant-safe-yes-031d-digital-lock-white',
  },
  {
    source: '/product/120',
    destination: '/eagle-premium-fire-resistant-safe-i-digital-key-lock-fingerprint-sensor-beige',
  },
  {
    source: '/product/62',
    destination: '/safire-fire-resistant-safe-fr-1060-el-digital-keylock',
  },
  {
    source: '/product/112',
    destination: '/eagle-premium-fire-resistant-safe-ege-085-digital-key-lock-fingerprint-sensor-beige',
  },
  {
    source: '/product/70',
    destination: '/eagle-fire-resistant-safe-yesm-020k-digital-keylock-blue',
  },
  {
    source: '/product/91',
    destination: '/eagle-premium-fire-resistant-safe-up-60-pt-digital-fingerprint-sensor-tulip',
  },
  {
    source: '/product/54',
    destination: '/safire-fire-resistant-safe-fr-40-vertical-1-digital-1-keylock',
  },
  {
    source: '/product/111',
    destination: '/eagle-premium-fire-resistant-safe-ege-085-digital-key-lock-fingerprint-sensor-black',
  },
  {
    source: '/product/97',
    destination: '/eagle-fire-resistant-safe-ss-065-2-keylock',
  },
  {
    source: '/product/86',
    destination: '/eagle-premium-fire-resistant-safe-mc-20-c1-digital-fingerprint-sensor',
  },
  {
    source: '/product/123',
    destination: '/eagle-premium-fire-resistant-safe-i-digital-key-lock-fingerprint-sensor-beige',
  },
  {
    source: '/product/119',
    destination: '/eagle-premium-fire-resistant-safe-ege-130-digital-key-lock-fingerprint-sensor-black',
  },
  {
    source: '/product/121',
    destination: '/eagle-premium-fire-resistant-safe-ege-170-digital-key-lock-fingerprint-sensor-red',
  },
  {
    source: '/product/94',
    destination: '/eagle-fire-resistant-safe-es-045-digital-keylock',
  },
  {
    source: '/product/65',
    destination: '/safire-fire-resistant-safe-fr-1360-2-keylock',
  },
  {
    source: '/product/51',
    destination: '/safire-fire-resistant-safe-fr-30-vertical-2kl-2-keylocks',
  },
  {
    source: '/product/116',
    destination: '/eagle-premium-fire-resistant-safe-ege-120-digital-key-lock-fingerprint-sensor-black',
  },
  {
    source: '/product/99',
    destination: '/eagle-fire-resistant-safe-ss-080-2-keylock',
  },
  {
    source: '/product/52',
    destination: '/safire-fire-resistant-safe-fr-30-vertical-1-digital-1-keylock',
  },
  {
    source: '/product/53',
    destination: '/safire-fire-resistant-safe-fr-40-vertical-2kl-2-keylocks',
  },
  {
    source: '/product/109',
    destination: '/eagle-fire-resistant-safe-ss-700-2-key-lock',
  },
  {
    source: '/product/80',
    destination: '/eagle-premium-fire-resistant-safe-mc-20-pr-ni-digital-fingerprint-sensor-ivory',
  },
  {
    source: '/product/59',
    destination: '/safire-fire-resistant-safe-fr-720-2-kl-2-keylocks',
  },
  {
    source: '/product/114',
    destination: '/eagle-premium-fire-resistant-safe-ege-100-digital-key-lock-fingerprint-sensor-black',
  },
  {
    source: '/product/84',
    destination: '/eagle-premium-fire-resistant-safe-mc-40-pr-hg-digital-fingerprint-sensor-hairline-grey',
  },
  {
    source: '/product/92',
    destination: '/eagle-fire-resistant-safe-es-035-digital-keylock',
  },
  {
    source: '/product/93',
    destination: '/eagle-fire-resistant-safe-ss-035-2-keylock',
  },
  {
    source: '/product/64',
    destination: '/safire-fire-resistant-safe-fr-1260-el-digital-keylock',
  },
  {
    source: '/product/104',
    destination: '/eagle-fire-resistant-safe-es-200-digital-keylock',
  },
  {
    source: '/product/98',
    destination: '/eagle-fire-resistant-safe-es-080-digital-keylock',
  },
  {
    source: '/product/102',
    destination: '/eagle-fire-resistant-safe-es-150-digital-keylock',
  },
  {
    source: '/product/66',
    destination: '/safire-fire-resistant-safe-fr-1360-el-digital-keylock',
  },
  {
    source: '/product/72',
    destination: '/eagle-fire-resistant-safe-yesm-020k-digital-keylock-green',
  },
  {
    source: '/product/90',
    destination: '/eagle-premium-fire-resistant-safe-up-40-nw-digital-fingerprint-sensor-wine',
  },
  {
    source: '/product/69',
    destination: '/eagle-fire-resistant-safe-yesm-020k-digital-keylock-black',
  },
  {
    source: '/product/63',
    destination: '/safire-fire-resistant-safe-fr-1260-2kl2-keylock',
  },
  {
    source: '/product/79',
    destination: '/eagle-fire-resistant-safe-yes-031d-digital-lock',
  },
  {
    source: '/product/61',
    destination: '/safire-fire-resistant-safe-fr-1060-2-kl-2-keylock',
  },
  {
    source: '/product/71',
    destination: '/eagle-fire-resistant-safe-yesm-020k-digital-keylock-red',
  },
  {
    source: '/product/49',
    destination: '/safire-fire-resistant-safe-fr-20-horizontal-2-keylocks',
  },
  {
    source: '/product/76',
    destination: '/eagle-fire-resistant-safe-yes-031dk-digital-keylock',
  },
  {
    source: '/product/95',
    destination: '/eagle-fire-resistant-safe-ss-045-2-keylock',
  },
  {
    source: '/product/100',
    destination: '/eagle-fire-resistant-safe-es-100-digital-keylock',
  },
  {
    source: '/product/60',
    destination: '/safire-fire-resistant-safe-fr-720-el-digital-keylock',
  },
  {
    source: '/product/56',
    destination: '/safire-fire-resistant-safe-fr-445-el-digital-keylock',
  },
  {
    source: '/product/83',
    destination: '/eagle-premium-fire-resistant-safe-mc-40-pr-ni-digital-fingerprint-sensor-ivory',
  },
  {
    source: '/product/75',
    destination: '/eagle-fire-resistant-safe-yes-031dk-digital-keylock',
  },
  {
    source: '/product/96',
    destination: '/eagle-fire-resistant-safe-es-065-digital-keylock',
  },
  {
    source: '/product/105',
    destination: '/eagle-fire-resistant-safe-ss-200-2-keylock',
  },
  {
    source: '/product/103',
    destination: '/eagle-fire-resistant-safe-ss-150-2-keylock',
  },
  {
    source: '/product/68',
    destination: '/eagle-fire-resistant-safe-yesm-020k-digital-keylock-white',
  },
  {
    source: '/product/78',
    destination: '/eagle-fire-resistant-safe-yes-031d-digital-lock-black',
  },
  {
    source: '/product/89',
    destination: '/eagle-premium-fire-resistant-safe-mc-40c1-rd-digital-fingerprint-sensor-red',
  },
  {
    source: '/product/107',
    destination: '/eagle-fire-resistant-safe-ss-350-2-keylock',
  },
  {
    source: '/product/82',
    destination: '/eagle-premium-fire-resistant-safe-mc-20-pr-ng-digital-fingerprint-sensor-natural-green',
  },
  {
    source: '/product/67',
    destination: '/eagle-fire-resistant-safe-yesm-015k-digital-keylock-white',
  },
  {
    source: '/product/124',
    destination: '/eagle-fire-resistant-filing-cabinet-sf-680-2ekx-2-drawers-with-digital-key-lock-on-top-draw',
  },
  {
    source: '/product/200',
    destination: '/silverline-sflm4dsd-four-drawers-lateral-cabinets',
  },
  {
    source: '/product/125',
    destination: '/eagle-fire-resistant-filing-cabinet-sf-680-3ekx-3-drawers-with-digital-key-lock-on-top-drawer',
  },
  {
    source: '/product/127',
    destination: '/eagle-fire-resistant-filing-cabinet-sf-680-4ekx-4-drawers-with-digital-key-lock-on-top-drawer',
  },
  {
    source: '/product/128',
    destination: '/eagle-fire-resistant-filing-cabinet-sf-680-4tkx-4-drawers-with-two-key-lock-on-top-drawer',
  },
  {
    source: '/product/199',
    destination: '/tecnostyle-a0-filing-chest-cabinet',
  },
  {
    source: '/product/126',
    destination: '/eagle-fire-resistant-filing-cabinet-sf-680-4ekk-4-drawers-with-digital-key-lock-on-top-draw-and-single-key-lock-on-each-drawers',
  },
  {
    source: '/product/326',
    destination: '/dahle-606-cross-cut-shredder',
  },
  {
    source: '/product/297',
    destination: '/fellowes-automax-200c-cross-cut-shredder',
  },
  {
    source: '/product/327',
    destination: '/dahle-610-micro-cut-shredder',
  },
  {
    source: '/product/295',
    destination: '/fellowes-powershred-225mi-micro-cut-shredder',
  },
  {
    source: '/product/330',
    destination: '/dahle-710-high-security-micro-cut-shre',
  },
  {
    source: '/product/281',
    destination: '/fellowes-powershred-79ci-cross-cut-shredder',
  },
  {
    source: '/product/331',
    destination: '/dahle-714-high-security-micro-cut-shred',
  },
  {
    source: '/product/332',
    destination: '/dahle-716-high-security-micro-cut-shre',
  },
  {
    source: '/product/333',
    destination: '/dahle-719-high-security-micro-cut-shre',
  },
  {
    source: '/product/329',
    destination: '/dahle-706-micro-cut-shredder',
  },
  {
    source: '/product/216',
    destination: '/dahle-ps60-strip-cut-shredder',
  },
  {
    source: '/product/328',
    destination: '/dahle-614-micro-cut-shredder',
  },
  {
    source: '/product/325',
    destination: '/dahle-519-cross-cut-shredder',
  },
  {
    source: '/product/324',
    destination: '/dahle-516-cross-cut-shredder',
  },
  {
    source: '/product/323',
    destination: '/dahle-510-cross-cut-shredder',
  },
  {
    source: '/product/322',
    destination: '/dahle-506-cross-cut-shredder',
  },
  {
    source: '/product/170',
    destination: '/rexel-optimum-autofeed-600m-automatic-micro-cut-paper-shredder',
  },
  {
    source: '/product/163',
    destination: '/rexel-optimum-autofeed-300x-automatic-cross-cut-paper-shredder',
  },
  {
    source: '/product/206',
    destination: '/fellowes-a4-size-laminator-model-ion-a4-fel4560401',
  },
  {
    source: '/product/137',
    destination: '/rexel-secure-x8-cross-cut-paper-shredder',
  },
  {
    source: '/product/159',
    destination: '/rexel-optimum-autofeed-50x-automatic-cross-cut-paper-shredder',
  },
  {
    source: '/product/215',
    destination: '/dahle-22312-cross-cut-shredder',
  },
  {
    source: '/product/250',
    destination: '/fellowes-powershred-lx85-cross-cut-shredder',
  },
  {
    source: '/product/161',
    destination: '/rexel-optimum-autofeed-150x-automatic-cross-cut-paper-shredder',
  },
  {
    source: '/product/142',
    destination: '/rexel-momentum-x312-sl-slimline-cross-cut-paper-shredder',
  },
  {
    source: '/product/168',
    destination: '/rexel-optimum-autofeed-225m-automatic-micro-cut-paper-shredder',
  },
  {
    source: '/product/150',
    destination: '/rexel-secure-mc6-micro-cut-paper-shredder-p5',
  },
  {
    source: '/product/167',
    destination: '/rexel-optimum-autofeed-150m-automatic-micro-cut-paper-shredder',
  },
  {
    source: '/product/296',
    destination: '/fellowes-automax-150c-auto-feed-cross-cut-shredder',
  },
  {
    source: '/product/158',
    destination: '/rexel-promax-qs-rss1535-strip-cut-paper-shredder',
  },
  {
    source: '/product/228',
    destination: '/fellowes-star-150-comb-binding',
  },
  {
    source: '/product/141',
    destination: '/rexel-momentum-x312-cross-cut-paper-shredder',
  },
  {
    source: '/product/217',
    destination: '/dahle-ps100-cross-cut-shredder',
  },
  {
    source: '/product/231',
    destination: '/fellowes-pulsar-e-300-electric-comb-binding-machine',
  },
  {
    source: '/product/140',
    destination: '/rexel-promax-qs-rsx1035-cross-cut-paper-shredder',
  },
  {
    source: '/product/139',
    destination: '/rexel-secure-x10-cross-cut-paper-shredder',
  },
  {
    source: '/product/236',
    destination: '/fellowes-orion-500-manual-heavy-duty-comb-binder',
  },
  {
    source: '/product/210',
    destination: '/fellowes-amaris-3-a3-office-laminator',
  },
  {
    source: '/product/301',
    destination: '/dahle-50414-model-410-office-shredder-oil-free',
  },
  {
    source: '/product/302',
    destination: '/dahle-50464-office-shredder-oil-free-model-410l-plus',
  },
  {
    source: '/product/321',
    destination: '/fellowes-powershred-485ci-cross-cut-shredder',
  },
  {
    source: '/product/291',
    destination: '/fellowes-micro-cut-shredder-10m-model',
  },
  {
    source: '/product/239',
    destination: '/fellowes-helios-60-thermal-binding-machine',
  },
  {
    source: '/product/240',
    destination: '/fellowes-quasar-wire-binding-machine',
  },
  {
    source: '/product/292',
    destination: '/fellowes-powershred-450m-shredder-micro-cut',
  },
  {
    source: '/product/242',
    destination: '/fellowes-powershred-lx25-cross-cut-shredder',
  },
  {
    source: '/product/171',
    destination: '/rexel-optimum-autofeed-750m-autom-micro-cut-paper-shredder',
  },
  
  
]

const nextConfig = {
  async redirects() {
    if (productRedirect.length === 0) {
      console.error("No redirects found in productRedirect array.");
    }
    
    return productRedirect.map((item) => ({
      source: item?.source,
      destination: item?.destination, 
      permanent: true,
    }));
  },
};
export default nextConfig;
