export type ProductCategory = 'sterile-dressing' | 'bandages' | 'cotton-products' | 'medical-kits' | 'protective-wear';

export interface Product {
    id: string;
    slug: string;
    name: string;
    category: ProductCategory;
    description: string;
    shortDescription: string;
    specs: Record<string, string>;
    benefits: string[];
    features: string[];
    imageUrl: string;
}

export const PRODUCTS: Product[] = [
    {
        id: 'p1',
        slug: 'gauze-swabs',
        name: 'Gauze Swabs (Sterile & Non Sterile)',
        category: 'sterile-dressing',
        description: 'We are a leading manufacturer and supplier of Gauze Swabs, known for our high-quality surgical bandages and dressings that strictly adhere to medical industry guidelines and norms.',
        shortDescription: 'High-quality surgical gauze swabs for medical use.',
        specs: {
            'Size': '5cm x 5cm, 7.5cm x 7.5cm, 10cm x 10cm',
            'PLY': '8 Ply, 12 Ply, 16 Ply',
            'Material': '100% Cotton',
            'Sterility': 'Sterile & Non-Sterile available',
            'Standard': 'BP/USP Compliant'
        },
        benefits: [
            'Prevents post-operative infections with strict sterilization protocols',
            'No loose threads ensures safety in surgical cavities',
            'Consistent absorbency reduces frequent dressing changes'
        ],
        features: ['Folded edges', 'X-ray detectable option', 'Individual sterile packaging'],
        imageUrl: '/images/products/1. GAUZE SWABS.jpg'
    },
    {
        id: 'p2',
        slug: 'mopping-pad',
        name: 'Mopping Pad (Sterile & Non Sterile)',
        category: 'sterile-dressing',
        description: 'Explore our premium X-Ray opaque thread, designed for superior absorption and durability. Mainly used in surgery to avoid h uge loss of blood.',
        shortDescription: 'Premium X-Ray opaque surgical mopping pads.',
        specs: {
            'Size': '20cm x 20cm, 25cm x 25cm, 30cm x 30cm',
            'PLY': '8 Ply, 12 PLY, 16 Ply',
            'X-Ray': 'Opaque thread',
            'Customization': 'As per your requirement',
            'Sterility': 'Sterile & Non-Sterile available'
        },
        benefits: [
            'X-ray detectable thread prevents retained surgical items',
            'Superior absorption minimizes blood loss visibility',
            'Custom sizes available for different surgical procedures'
        ],
        features: ['X-ray opaque thread', 'High absorbency', 'Customizable sizes'],
        imageUrl: '/images/products/2. mopping pad.jpg'
    },
    {
        id: 'p3',
        slug: 'gamjee-pad-roll',
        name: 'Gamjee Pad/Roll (Sterile & Non Sterile)',
        category: 'sterile-dressing',
        description: 'Discover our premium dressing pads, made from medical-grade cotton for versatile, disposable surgical use, offering unmatched quality and performance.',
        shortDescription: 'Versatile disposable dressing pads for surgical use.',
        specs: {
            'Size': '10cm x 2m, 10cm x 3m, 15cm x 2m, 15cm x 3m',
            'GSM': '300, 400, 500',
            'Material': 'Medical-grade Cotton',
            'Customization': 'As per your requirement',
            'Sterility': 'Sterile & Non-Sterile available'
        },
        benefits: [
            'Soft, medical-grade material ensures gentle contact with wound sites',
            'Multiple GSM options for different exudate levels',
            'Disposable design reduces cross-contamination risk'
        ],
        features: ['Premium material quality', 'Multiple size options', 'Customizable GSM'],
        imageUrl: '/images/products/3. GAMJEE PAD.jpg'
    },
    {
        id: 'p4',
        slug: 'roller-bandage',
        name: 'Roller Bandage',
        category: 'bandages',
        description: 'Experience our superior roller bandages—smooth, clean-edged, chemical-free, and customizable for exceptional performance and reliability.',
        shortDescription: 'Chemical-free roller bandages with clean edges.',
        specs: {
            'Size': '5cm, 7.5cm, 10cm, 15cm',
            'Length': '3 Mtr, 9 Mtr, 10 Mtr',
            'Material': '100% Cotton',
            'Finish': 'Smooth, clean-edged',
            'Customization': 'Size & Mtr as per your requirement'
        },
        benefits: [
            'Chemical-free processing prevents skin irritation and allergic reactions',
            'Clean edges ensure professional appearance and easy application',
            'Customizable lengths reduce waste and cost'
        ],
        features: ['Chemical-free', 'Smooth finish', 'Fully customizable'],
        imageUrl: '/images/products/4. ROLLER BANDAGE.jpg'
    },
    {
        id: 'p5',
        slug: 'gauze-bandage-cloth',
        name: 'Gauze & Bandage Cloth',
        category: 'bandages',
        description: 'Our gauze cloth ensures exceptional quality, smooth edges, easy unwinding, and a chemical-free, user-friendly design.',
        shortDescription: 'High-quality gauze cloth with smooth edges.',
        specs: {
            'Size': '100cm x 10m, 100cm x 18m, 120cm x 10m, 120cm x 18m',
            'Material': '100% Cotton',
            'Finish': 'Smooth edges',
            'Quality': 'Chemical-free',
            'Customization': 'Meters as per your requirement'
        },
        benefits: [
            'Smooth edges prevent fraying during application',
            'Easy unwinding saves time in emergency situations',
            'Chemical-free ensures patient safety'
        ],
        features: ['Easy unwinding', 'Smooth edges', 'Chemical-free'],
        imageUrl: '/images/products/5. GAUZE CLOTH-A.jpg'
    },
    {
        id: 'p6',
        slug: 'jumbo-roll',
        name: 'Jumbo Roll',
        category: 'bandages',
        description: 'Our Gauze & Bandage Jumbo Rolls provide superior absorbency, comfort, and protection, available in various sizes with customization options.',
        shortDescription: 'Large format gauze rolls for bulk applications.',
        specs: {
            'Size': '100cm, 120cm',
            'Length': 'Above 1000 meters',
            'Material': '100% Cotton Gauze',
            'Application': 'Bulk medical use',
            'Customization': 'Available'
        },
        benefits: [
            'Extended length reduces frequent roll changes',
            'Cost-effective for high-volume medical facilities',
            'Superior absorbency maintains wound care standards'
        ],
        features: ['1000+ meters length', 'Bulk packaging', 'Cost-effective'],
        imageUrl: '/images/products/6. JUMBO ROLL.jpg'
    },
    {
        id: 'p7',
        slug: 'absorbent-cotton',
        name: 'Absorbent Cotton',
        category: 'cotton-products',
        description: 'Our Absorbent Cotton offers superior quality, high absorbency, smooth edges, and a chemical-free, user-friendly design for reliability and comfort.',
        shortDescription: 'Superior quality absorbent cotton for medical use.',
        specs: {
            'Gross Weight': '500 grms, 400 grms',
            'Net Weight': '200 grms, 400 grms, 500 grms',
            'Type': 'Multi purpose',
            'Purity': '100% Cotton',
            'Standard': 'BP Compliant'
        },
        benefits: [
            'High absorbency ensures effective wound fluid management',
            'Chemical-free processing prevents skin reactions',
            'Multiple packaging sizes suit different clinical needs'
        ],
        features: ['Chemical-free', 'High absorbency', 'Multi-purpose use'],
        imageUrl: '/images/products/7. ABSORBENT COTTON.jpg'
    },
    {
        id: 'p8',
        slug: 'cotton-ball',
        name: 'Cotton Ball',
        category: 'cotton-products',
        description: 'We manufacture and supply 100% natural cotton balls, ideal for medical use, including bleeding control from injections or venipuncture.',
        shortDescription: '100% natural cotton balls for medical procedures.',
        specs: {
            'Material': '100% Cotton',
            'Weight': '0.5 gram, 1 gram',
            'Purity': 'Natural cotton',
            'Application': 'Bleeding control, wound care',
            'Sterility': 'Non-sterile (autoclavable)'
        },
        benefits: [
            'Uniform size ensures consistent application',
            'Soft texture prevents tissue trauma',
            'Ideal for bleeding control after injections'
        ],
        features: ['100% natural', 'Uniform weight', 'Medical grade'],
        imageUrl: '/images/products/8. COTTON BALL.jpg'
    },
    {
        id: 'p9',
        slug: 'zig-zag-cotton',
        name: 'Zig Zag Cotton',
        category: 'cotton-products',
        description: 'Our Zig Zag Cotton provide superior absorbency, comfort, and protection, it is very soft, smooth and hygienic.',
        shortDescription: 'Soft, smooth and hygienic zig zag cotton.',
        specs: {
            'Size': '100 gram, 200 gram, 500 gram',
            'Material': '100% Cotton',
            'Pattern': 'Zig Zag fold',
            'Quality': 'Soft, smooth, hygienic',
            'Application': 'General medical use'
        },
        benefits: [
            'Zig zag pattern allows easy dispensing',
            'Soft texture ensures patient comfort',
            'Hygienic packaging maintains sterility until use'
        ],
        features: ['Zig zag fold', 'Very soft', 'Hygienic'],
        imageUrl: '/images/products/9. ZIG ZAG COTTON.jpg'
    },
    {
        id: 'p10',
        slug: 'dressing-kit-dialysis-kit',
        name: 'Dressing Kit & Dialysis Kit',
        category: 'medical-kits',
        description: 'A Dressing Kit is a sterile set of supplies for wound care, while a Dialysis Kit ensures hygiene and safety during dialysis procedures.',
        shortDescription: 'Sterile medical kits for wound care and dialysis.',
        specs: {
            'Dressing Kit': 'Tweezers, Cotton Balls, Drape, Disposable Bag',
            'Contents': 'Wrap, Gauze Swabs, Tray, Dressing Pad',
            'Sterility': 'Fully sterile',
            'Packaging': 'Individual sealed packs',
            'Application': 'Wound care & Dialysis'
        },
        benefits: [
            'Complete kit reduces procurement complexity',
            'Sterile packaging ensures infection control',
            'Standardized contents improve procedure consistency'
        ],
        features: ['Complete kit', 'Sterile packaging', 'Ready to use'],
        imageUrl: '/images/products/10. DRESSING KIT & DIALYSIS KIT.jpg'
    },
    {
        id: 'p11',
        slug: 'disposable-bed-sheet-pillow-cover',
        name: 'Disposable Bed Sheet & Pillow Cover',
        category: 'protective-wear',
        description: 'We manufacture and supply 100% natural cotton balls, ideal for medical use, including bleeding control from injections or venipuncture.',
        shortDescription: 'Cost-effective disposable bedding for medical facilities.',
        specs: {
            'Material': 'Spunbond SMS/SMMS',
            'Features': 'Cost Effective, Easily Disposable',
            'Application': 'Hospital beds, examination tables',
            'Quality': 'Medical grade non-woven',
            'Color': 'White'
        },
        benefits: [
            'Disposable design eliminates laundry costs',
            'SMS/SMMS material provides fluid barrier protection',
            'Cost-effective solution for high-turnover facilities'
        ],
        features: ['Cost effective', 'Easily disposable', 'Fluid resistant'],
        imageUrl: '/images/products/11. DISPOSABLE COVER.jpg'
    },
    {
        id: 'p12',
        slug: 'patient-gown-surgeon-gown',
        name: 'Patient Gown & Surgeon Gown',
        category: 'protective-wear',
        description: 'Patient gowns: Used for diagnosis and feeding. Surgeon gowns: AAMI Level 2, for procedures under 2 hours.',
        shortDescription: 'Medical gowns for patients and surgical procedures.',
        specs: {
            'Type': 'Patient Gown & Surgeon Gown',
            'Surgeon Level': 'AAMI Level 2',
            'Duration': 'Procedures under 2 hours',
            'Sizes': 'Small, Medium, Large, Extra Large',
            'Material': 'SMS Non-woven fabric'
        },
        benefits: [
            'AAMI Level 2 certification ensures adequate protection',
            'Multiple sizes ensure proper fit for all users',
            'Suitable for various diagnostic and surgical procedures'
        ],
        features: ['AAMI Level 2', 'Multiple sizes', 'Medical grade'],
        imageUrl: '/images/products/12. patient gown & surgeon gown.jpg'
    }
];

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
    { id: 'sterile-dressing', label: 'Sterile Dressing' },
    { id: 'bandages', label: 'Bandages & Cloth' },
    { id: 'cotton-products', label: 'Cotton Products' },
    { id: 'medical-kits', label: 'Medical Kits' },
    { id: 'protective-wear', label: 'Protective Wear' },
];
