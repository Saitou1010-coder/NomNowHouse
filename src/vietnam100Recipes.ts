import { Recipe } from './types';

export const VIETNAM_100_RECIPES: Partial<Recipe>[] = [
  {
    title: "Cơm sườn nướng",
    category: "Lunch",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Lunch", "Dinner", "Cơm gia đình", "Món mặn", "Ướp và nướng", "Miền Nam"],
    calories: 550,
    protein: 32,
    fat: 22,
    carbs: 58,
    ingredients: ["sườn heo", "gạo", "tỏi", "mật ong", "nước mắm", "hành tím", "sả", "tiêu"],
    instructions: [
      "Sườn heo rửa sạch, đập dập nhẹ cho mềm.",
      "Ướp sườn với nước mắm, mật ong, tỏi băm, hành tím băm, sả và chút tiêu trong ít nhất 30 phút.",
      "Nướng sườn trên than hồng hoặc lò nướng ở 200°C trong 20 phút cho đến khi xém vàng thơm.",
      "Dọn ăn cùng cơm nóng, dưa leo và nước mắm chua ngọt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Sườn ướp đậm vị, nướng thơm ăn cùng cơm nóng và đồ chua."
  },
  {
    title: "Cơm tấm bì chả",
    category: "Lunch",
    rating: 5,
    estimatedTime: 40,
    tags: ["Vietnamese", "Sáng", "Trưa", "Tối", "Cơm", "Món mặn", "Nướng và hấp", "Miền Nam"],
    calories: 620,
    protein: 35,
    fat: 25,
    carbs: 65,
    ingredients: ["gạo tấm", "sườn heo", "bì heo", "trứng", "chả trứng", "nước mắm", "tỏi ớt"],
    instructions: [
      "Nấu cơm tấm bằng gạo tấm thơm cho hạt tơi xốp.",
      "Làm bì heo thái sợi trộn thính thơm.",
      "Hấp chả trứng và nướng sườn tấm.",
      "Dọn đĩa cơm tấm với sườn, bì, chả, mỡ hành, đồ chua và nước mắm pha."
    ],
    imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Đĩa cơm tấm đủ vị với sườn, bì, chả và nước mắm pha."
  },
  {
    title: "Cơm gà xối mỡ",
    category: "Lunch",
    rating: 5,
    estimatedTime: 45,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm", "Món gà", "Chiên giòn", "Miền Nam"],
    calories: 680,
    protein: 38,
    fat: 30,
    carbs: 62,
    ingredients: ["gà", "gạo", "tỏi", "dầu ăn", "dưa leo", "xì dầu", "gừng"],
    instructions: [
      "Gà luộc sơ qua với gừng rồi để ráo nước.",
      "Nấu cơm với nước luộc gà và chút nghệ cho hạt cơm vàng óng thơm.",
      "Xối mỡ nóng già lên gà để da giòn rụm và thịt mềm mọng.",
      "Ăn kèm cơm gà, dưa leo và nước tương gừng."
    ],
    imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Gà da giòn, thịt mềm, ăn với cơm thơm và nước tương gừng."
  },
  {
    title: "Cơm gà Hội An",
    category: "Lunch",
    rating: 5,
    estimatedTime: 40,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm", "Món gà", "Luộc và trộn", "Miền Trung"],
    calories: 520,
    protein: 34,
    fat: 16,
    carbs: 58,
    ingredients: ["gà ta", "gạo", "nghệ", "hành tây", "rau răm", "chanh", "tiêu"],
    instructions: [
      "Luộc gà ta với chút nghệ để da gà có màu vàng ươm.",
      "Gạo vo sạch, nấu bằng nước luộc gà cho béo và thơm.",
      "Gà xé phay trộn đều với hành tây thái mỏng, rau răm, muối tiêu và nước cốt chanh.",
      "Dọn cơm dẻo cùng gỏi gà rau răm thanh vị."
    ],
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cơm vàng nhẹ, gà xé trộn rau răm và hành tây thanh vị."
  },
  {
    title: "Cơm rang dưa bò",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 25,
    tags: ["Vietnamese", "Sáng", "Trưa", "Tối", "Cơm chiên", "Món bò", "Chiên xào", "Miền Bắc"],
    calories: 540,
    protein: 28,
    fat: 18,
    carbs: 64,
    ingredients: ["cơm nguội", "thịt bò", "dưa cải chua", "trứng", "hành lá", "tỏi", "dầu ăn"],
    instructions: [
      "Thịt bò thái mỏng, ướp tỏi, nước tương và tiêu.",
      "Xào nhanh thịt bò với dưa cải chua rồi trút ra đĩa.",
      "Cho cơm nguội vào chảo rang săn hạt, đập trứng vào đảo đều.",
      "Trộn dưa bò đã xào vào đảo chung cho quyện vị rồi tắt bếp."
    ],
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cơm rang săn hạt, chua nhẹ từ dưa cải và thơm vị bò xào."
  },
  {
    title: "Cơm chiên hải sản",
    category: "Lunch",
    rating: 4.8,
    estimatedTime: 25,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm chiên", "Hải sản", "Chiên xào"],
    calories: 560,
    protein: 30,
    fat: 17,
    carbs: 66,
    ingredients: ["cơm", "trứng", "tôm", "mực", "đậu Hà Lan", "cà rốt", "hành lá"],
    instructions: [
      "Tôm và mực cắt hạt lươu, xào chín tới với chút tỏi.",
      "Cơm nguội trộn đều với lòng đỏ trứng gà.",
      "Phi thơm tỏi, cho cơm vào chiên lửa lớn đến khi hạt cơm săn.",
      "Thêm hải sản và rau củ vào đảo đều, nêm nếm vừa ăn."
    ],
    imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cơm chiên nhiều màu, vị ngọt từ tôm mực và rau củ."
  },
  {
    title: "Cơm chiên cá mặn",
    category: "Lunch",
    rating: 4.7,
    estimatedTime: 20,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm chiên", "Món cá", "Chiên xào"],
    calories: 510,
    protein: 26,
    fat: 16,
    carbs: 62,
    ingredients: ["cơm", "cá mặn", "trứng", "hành lá", "tỏi", "tiêu"],
    instructions: [
      "Cá mặn chiên sơ rồi gỡ lấy thịt, băm nhỏ.",
      "Phi tỏi thơm, cho cá mặn vào đảo đều rồi cho cơm nguội vào chiên giòn hạt.",
      "Thêm trứng và hành lá cắt nhỏ, đảo đều tay cho thơm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cơm chiên thơm mặn vừa, hợp bữa nhanh trong gia đình."
  },
  {
    title: "Cơm bò lúc lắc",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 30,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm", "Món bò", "Xào áp chảo"],
    calories: 590,
    protein: 34,
    fat: 24,
    carbs: 58,
    ingredients: ["thịt bò", "khoai tây", "ớt chuông", "hành tây", "cơm", "bơ lạt", "tỏi"],
    instructions: [
      "Thịt bò cắt khối vuông vừa ăn, ướp tỏi, dầu hào và tiêu.",
      "Ớt chuông và hành tây cắt miếng vuông.",
      "Áp chảo thịt bò trên lửa lớn với bơ cho xém cạnh bên ngoài mà vẫn mềm bên trong.",
      "Xào sơ rau củ rồi trộn chung với bò, dọn kèm cơm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bò cắt khối xào nhanh, mềm thơm, ăn với cơm hoặc khoai chiên."
  },
  {
    title: "Cơm niêu cá kho",
    category: "Dinner",
    rating: 5,
    estimatedTime: 50,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món cá", "Kho và nấu niêu"],
    calories: 520,
    protein: 36,
    fat: 16,
    carbs: 56,
    ingredients: ["cá", "gạo", "nước mắm", "tiêu", "ớt", "hành tím", "nước màu"],
    instructions: [
      "Nấu cơm bằng niêu đất cho hạt cơm dẻo và có lớp cháy giòn thơm.",
      "Cá kho tộ đậm đà với nước mắm, tiêu và ớt.",
      "Dọn cá kho nóng hổi cùng niêu cơm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cá kho đậm vị dùng cùng cơm niêu nóng, hợp bữa tối gia đình."
  },
  {
    title: "Cơm niêu thịt kho tiêu",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 45,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món heo", "Kho"],
    calories: 580,
    protein: 32,
    fat: 28,
    carbs: 52,
    ingredients: ["thịt heo", "tiêu", "nước mắm", "đường", "hành tím", "tỏi"],
    instructions: [
      "Thịt ba chỉ cắt miếng vừa ăn, ướp nước mắm, đường và tiêu.",
      "Kho thịt trên lửa nhỏ cho nước sốt sánh lại và thấm gia vị.",
      "Dọn cùng cơm niêu nóng."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Thịt kho sánh màu, thơm tiêu, đưa cơm trong bữa gia đình."
  },
  {
    title: "Cơm thịt kho trứng",
    category: "Dinner",
    rating: 5,
    estimatedTime: 50,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món kho", "Kho", "Miền Nam"],
    calories: 610,
    protein: 36,
    fat: 32,
    carbs: 52,
    ingredients: ["thịt ba chỉ", "trứng vịt", "nước dừa", "nước mắm", "hành tím"],
    instructions: [
      "Thịt ba chỉ ướp gia vị, trứng vịt luộc bóc vỏ.",
      "Kho thịt với nước dừa tươi và trứng trong 45 phút cho mềm rục."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Món kho mềm béo, vị ngọt mặn cân bằng, quen thuộc ngày thường."
  },
  {
    title: "Cơm cá thu sốt cà",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 30,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món cá", "Chiên và sốt"],
    calories: 490,
    protein: 32,
    fat: 16,
    carbs: 54,
    ingredients: ["cá thu", "cà chua", "hành lá", "tỏi", "nước mắm", "dầu ăn"],
    instructions: [
      "Cá thu chiên vàng hai mặt.",
      "Xào cà chua nhuyễn làm sốt, nêm nước mắm rồi cho cá vào rim thấm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cá thu chiên săn, áo sốt cà chua dịu ngọt."
  },
  {
    title: "Cơm cá basa kho tộ",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 35,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món kho", "Kho tộ"],
    calories: 520,
    protein: 30,
    fat: 24,
    carbs: 48,
    ingredients: ["cá basa", "nước mắm", "tiêu", "ớt", "nước màu", "hành tỏi"],
    instructions: [
      "Cá basa cắt khúc, ướp gia vị đậm đà.",
      "Kho tộ trên lửa nhỏ đến khi sốt keo lại."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cá kho mềm, sốt sánh, hợp ăn với cơm trắng nóng."
  },
  {
    title: "Cơm tép rang khế",
    category: "Dinner",
    rating: 4.7,
    estimatedTime: 25,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món rang", "Rang", "Miền Bắc"],
    calories: 420,
    protein: 28,
    fat: 14,
    carbs: 46,
    ingredients: ["tép đồng", "khế chua", "hành tím", "nước mắm", "đường", "dầu ăn"],
    instructions: [
      "Tép rửa sạch để ráo. Khế thái lát mỏng hình ngôi sao.",
      "Rang tép với hành tím và mỡ cho săn giòn, sau đó cho khế vào xào chung."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Tép rang giòn thơm, điểm vị chua nhẹ từ khế."
  },
  {
    title: "Cơm đậu hũ sốt cà",
    category: "Dinner",
    rating: 4.7,
    estimatedTime: 20,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm chay", "Món sốt", "Chiên và sốt"],
    calories: 380,
    protein: 18,
    fat: 16,
    carbs: 44,
    ingredients: ["đậu hũ", "cà chua", "hành lá", "nấm", "nước tương", "dầu ăn"],
    instructions: [
      "Đậu hũ cắt miếng vuông chiên vàng các mặt.",
      "Xào cà chua làm sốt rồi cho đậu hũ vào rim nhỏ lửa."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Đậu hũ mềm thơm trong sốt cà chua, dễ ăn cho bữa nhẹ."
  },
  {
    title: "Cơm gà kho gừng",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 35,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món gà", "Kho"],
    calories: 490,
    protein: 34,
    fat: 18,
    carbs: 48,
    ingredients: ["gà", "gừng", "nước mắm", "hành tím", "tiêu", "đường"],
    instructions: [
      "Gà chặt miếng vừa ăn, gừng thái sợi.",
      "Kho gà với gừng và nước mắm trên lửa nhỏ cho thịt thấm gia vị ấm nồng."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Gà kho thơm ấm vị gừng, hợp ngày mưa và bữa tối."
  },
  {
    title: "Cơm gà rim mắm",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 30,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món gà", "Rim"],
    calories: 530,
    protein: 36,
    fat: 20,
    carbs: 50,
    ingredients: ["cánh gà", "nước mắm", "tỏi", "đường", "ớt"],
    instructions: [
      "Cánh gà chiên xém vàng.",
      "Rim với hỗn hợp nước mắm tỏi ớt đường đến khi sánh kẹo."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cánh gà áo sốt mắm tỏi, vị mặn ngọt dễ bắt cơm."
  },
  {
    title: "Cơm sườn ram mặn",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 35,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món heo", "Ram"],
    calories: 560,
    protein: 32,
    fat: 25,
    carbs: 48,
    ingredients: ["sườn non", "nước mắm", "đường", "tỏi", "hành tím"],
    instructions: [
      "Sườn non ướp gia vị, ram nhỏ lửa cho mềm thấm.",
      "Nước sốt kẹo lại bao quanh từng dẻ sườn."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Sườn ram mềm, sốt kẹo nhẹ, phù hợp bữa cơm nhà."
  },
  {
    title: "Cơm thịt ba chỉ rang cháy cạnh",
    category: "Dinner",
    rating: 5,
    estimatedTime: 25,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món rang", "Rang"],
    calories: 610,
    protein: 30,
    fat: 40,
    carbs: 46,
    ingredients: ["thịt ba chỉ", "sả", "tỏi", "nước mắm", "ớt"],
    instructions: [
      "Thịt ba chỉ thái mỏng, rang trên chảo cho ra bớt mỡ đến khi xém cạnh.",
      "Thêm sả tỏi băm và nước mắm vào đảo đều thơm phức."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Ba chỉ rang cạnh xém thơm, vị mặn cay vừa phải."
  },
  {
    title: "Cơm bò kho gừng",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 40,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món bò", "Kho"],
    calories: 530,
    protein: 35,
    fat: 22,
    carbs: 48,
    ingredients: ["thịt bò", "gừng", "nước mắm", "tiêu", "hành tím"],
    instructions: [
      "Thịt bò thái khối vuông, kho nhừ với gừng và nước mắm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bò kho mềm và thơm gừng, dùng với cơm trắng."
  },
  {
    title: "Canh chua cá lóc",
    category: "Dinner",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Trưa", "Tối", "Canh", "Món cá", "Nấu canh", "Miền Nam"],
    calories: 280,
    protein: 26,
    fat: 8,
    carbs: 24,
    ingredients: ["cá lóc", "me", "cà chua", "dứa", "bạc hà", "đậu bắp", "giá"],
    instructions: [
      "Cá lóc làm sạch cắt khúc. Me dầm lấy nước cốt.",
      "Phi thơm hành, xào sơ cà chua và dứa rồi thêm nước nấu sôi.",
      "Cho cá lóc vào nấu chín, tiếp tục thêm bạc hà, đậu bắp, giá và rau thơm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Canh chua Nam Bộ vị thanh, nhiều rau và cá ngọt thịt."
  },
  {
    title: "Canh rau ngót thịt băm",
    category: "Lunch",
    rating: 4.8,
    estimatedTime: 15,
    tags: ["Vietnamese", "Trưa", "Tối", "Canh", "Món heo", "Nấu canh"],
    calories: 180,
    protein: 14,
    fat: 6,
    carbs: 16,
    ingredients: ["rau ngót", "thịt băm", "hành tím", "nước mắm"],
    instructions: [
      "Thịt băm xào sơ với hành tím.",
      "Cho nước vào đun sôi, vò nát rau ngót rồi thả vào nấu chín."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Canh xanh ngọt nhẹ, nhanh gọn cho bữa cơm gia đình."
  },
  {
    title: "Canh bí đỏ nấu tôm",
    category: "Lunch",
    rating: 4.8,
    estimatedTime: 20,
    tags: ["Vietnamese", "Trưa", "Tối", "Canh", "Hải sản", "Nấu canh"],
    calories: 210,
    protein: 16,
    fat: 5,
    carbs: 26,
    ingredients: ["bí đỏ", "tôm tươi", "hành lá", "ngò", "nước mắm"],
    instructions: [
      "Tôm bóc vỏ băm nhuyễn, xào thơm.",
      "Cho nước vào đun sôi, thả bí đỏ cắt khối vào ninh mềm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Canh bí đỏ mềm ngọt, tôm tạo vị thanh tự nhiên."
  },
  {
    title: "Canh bầu nấu tôm",
    category: "Lunch",
    rating: 4.9,
    estimatedTime: 20,
    tags: ["Vietnamese", "Trưa", "Tối", "Canh", "Hải sản", "Nấu canh"],
    calories: 190,
    protein: 15,
    fat: 4,
    carbs: 22,
    ingredients: ["bầu", "tôm tươi", "tỏi", "hành lá", "nước mắm"],
    instructions: [
      "Bầu băm hoặc thái sợi. Tôm giã dập xào thơm.",
      "Thêm nước nấu sôi rồi cho bầu vào, nêm nếm vừa ăn."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Canh bầu trong, mát, rất hợp những bữa cơm mùa nóng."
  },
  {
    title: "Canh cua rau đay",
    category: "Lunch",
    rating: 5,
    estimatedTime: 25,
    tags: ["Vietnamese", "Trưa", "Tối", "Canh", "Món đồng quê", "Nấu canh", "Miền Bắc"],
    calories: 220,
    protein: 18,
    fat: 7,
    carbs: 20,
    ingredients: ["cua đồng", "rau đay", "mồng tơi", "mướp", "mắm tôm"],
    instructions: [
      "Cua đồng xay lọc lấy nước thịt.",
      "Đun nước cua đến khi gạch nổi lên thì vớt ra.",
      "Cho rau đay, mồng tơi thái nhỏ và mướp vào nấu chín, thả gạch lên trên."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Canh cua dân dã, ngọt vị cua và rau mềm mát."
  },
  {
    title: "Canh khổ qua nhồi thịt",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 40,
    tags: ["Vietnamese", "Trưa", "Tối", "Canh", "Món heo", "Hầm"],
    calories: 250,
    protein: 20,
    fat: 10,
    carbs: 18,
    ingredients: ["khổ qua", "thịt băm", "nấm mèo", "hành lá", "tiêu"],
    instructions: [
      "Khổ qua khoét ruột rửa sạch. Trộn thịt băm với nấm mèo và gia vị rồi nhồi vào khổ qua.",
      "Hầm nhừ trong nước dùng thanh trong."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Khổ qua nhồi thịt mềm, nước canh trong và hơi đắng nhẹ."
  },
  {
    title: "Canh cải thịt băm",
    category: "Lunch",
    rating: 4.8,
    estimatedTime: 15,
    tags: ["Vietnamese", "Trưa", "Tối", "Canh", "Món heo", "Nấu canh"],
    calories: 170,
    protein: 14,
    fat: 5,
    carbs: 16,
    ingredients: ["cải xanh", "thịt băm", "gừng", "nước mắm"],
    instructions: [
      "Xào thịt băm rồi thêm nước và vài lát gừng đun sôi.",
      "Thả cải xanh thái nhỏ vào nấu chín tới."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Canh cải xanh dễ nấu, thơm gừng, cân bằng món kho mặn."
  },
  {
    title: "Canh mồng tơi nấu tôm",
    category: "Lunch",
    rating: 4.8,
    estimatedTime: 18,
    tags: ["Vietnamese", "Trưa", "Tối", "Canh", "Hải sản", "Nấu canh"],
    calories: 190,
    protein: 15,
    fat: 5,
    carbs: 18,
    ingredients: ["mồng tơi", "tôm", "mướp", "hành tím"],
    instructions: [
      "Nấu nước với tôm băm, sau đó cho mồng tơi và mướp cắt khối vào."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Canh mồng tơi mềm mát, có vị ngọt tự nhiên từ tôm."
  },
  {
    title: "Canh kim chi thịt bò kiểu Việt",
    category: "Dinner",
    rating: 4.7,
    estimatedTime: 25,
    tags: ["Vietnamese", "Trưa", "Tối", "Canh", "Món bò", "Nấu canh"],
    calories: 310,
    protein: 22,
    fat: 14,
    carbs: 22,
    ingredients: ["kim chi", "thịt bò", "đậu hũ", "nấm", "hành boa rô"],
    instructions: [
      "Xào kim chi với thịt bò, thêm nước và đậu hũ đun sôi."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Canh chua cay nhẹ, được Việt hóa cho bữa cơm nhanh."
  },
  {
    title: "Canh sườn non rau củ",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 45,
    tags: ["Vietnamese", "Trưa", "Tối", "Canh", "Món heo", "Hầm"],
    calories: 340,
    protein: 24,
    fat: 16,
    carbs: 26,
    ingredients: ["sườn non", "cà rốt", "khoai tây", "su su", "hành lá"],
    instructions: [
      "Hầm sườn non cho mềm ngọt nước, sau đó thêm khoai tây, cà rốt và su su vào nấu chín."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Sườn hầm mềm cùng rau củ, nước dùng ngọt và dễ ăn."
  },
  {
    title: "Rau muống xào tỏi",
    category: "Lunch",
    rating: 5,
    estimatedTime: 12,
    tags: ["Vietnamese", "Trưa", "Tối", "Rau xào", "Món chay", "Xào"],
    calories: 140,
    protein: 4,
    fat: 8,
    carbs: 12,
    ingredients: ["rau muống", "tỏi", "dầu ăn", "nước mắm"],
    instructions: [
      "Luộc sơ rau muống qua nước sôi rồi vớt ra nước đá để giữ độ xanh giòn.",
      "Phi tỏi thơm vàng rồi cho rau muống vào xào lửa lớn nhanh tay."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Rau xanh giòn, thơm tỏi, món phụ quen thuộc trong bữa cơm."
  },
  {
    title: "Cải thìa xào nấm",
    category: "Lunch",
    rating: 4.8,
    estimatedTime: 15,
    tags: ["Vietnamese", "Trưa", "Tối", "Rau xào", "Món chay", "Xào"],
    calories: 150,
    protein: 5,
    fat: 8,
    carbs: 14,
    ingredients: ["cải thìa", "nấm đông cô", "tỏi", "dầu hào chay"],
    instructions: [
      "Cải thìa chẻ đôi chần chín tới. Nấm đông cô ngâm nở xào thơm.",
      "Xào chung với dầu hào chay."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cải thìa giòn ngọt xào cùng nấm, hợp cả bữa chay và mặn."
  },
  {
    title: "Bông cải xào bò",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 20,
    tags: ["Vietnamese", "Trưa", "Tối", "Rau xào", "Món bò", "Xào"],
    calories: 310,
    protein: 24,
    fat: 14,
    carbs: 20,
    ingredients: ["bông cải xanh", "thịt bò", "tỏi", "dầu hào"],
    instructions: [
      "Thịt bò ướp xào tái chín rồi trút ra.",
      "Xào bông cải xanh chín tới rồi cho bò vào đảo nhanh."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bông cải giòn và bò mềm, giàu rau cho bữa cơm cân bằng."
  },
  {
    title: "Đậu que xào tỏi",
    category: "Lunch",
    rating: 4.7,
    estimatedTime: 15,
    tags: ["Vietnamese", "Trưa", "Tối", "Rau xào", "Món chay", "Xào"],
    calories: 130,
    protein: 4,
    fat: 7,
    carbs: 15,
    ingredients: ["đậu que", "tỏi", "dầu ăn", "nước tương"],
    instructions: [
      "Đậu que tước xơ, xào chín tới với tỏi phi."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Đậu que xanh giòn, vị tỏi thơm, làm nhanh trong vài phút."
  },
  {
    title: "Su su xào trứng",
    category: "Lunch",
    rating: 4.8,
    estimatedTime: 15,
    tags: ["Vietnamese", "Trưa", "Tối", "Rau xào", "Món trứng", "Xào"],
    calories: 210,
    protein: 8,
    fat: 12,
    carbs: 18,
    ingredients: ["su su", "trứng", "hành lá", "tỏi"],
    instructions: [
      "Su su thái sợi xào chín mềm, đập trứng vào đảo đều quyện lấy su su."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Su su ngọt giòn xào trứng mềm, món gia đình tiết kiệm."
  },
  {
    title: "Mướp xào lòng gà",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 20,
    tags: ["Vietnamese", "Trưa", "Tối", "Rau xào", "Món gà", "Xào"],
    calories: 240,
    protein: 18,
    fat: 12,
    carbs: 14,
    ingredients: ["mướp", "lòng gà", "hành lá", "tỏi", "tiêu"],
    instructions: [
      "Lòng gà xào chín tới rồi cho mướp thái xéo vào xào nhanh tay."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Mướp mềm ngọt xào lòng gà, vị dân dã và đậm đà."
  },
  {
    title: "Giá hẹ xào đậu hũ",
    category: "Lunch",
    rating: 4.7,
    estimatedTime: 15,
    tags: ["Vietnamese", "Trưa", "Tối", "Rau xào", "Món chay", "Xào"],
    calories: 160,
    protein: 10,
    fat: 9,
    carbs: 12,
    ingredients: ["giá", "hẹ", "đậu hũ", "tỏi", "nước tương"],
    instructions: [
      "Đậu hũ cắt lát chiên vàng. Xào nhanh giá đỗ và hẹ rồi cho đậu hũ vào."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Món xào thanh nhẹ, giòn mềm xen kẽ, hợp bữa tối nhẹ."
  },
  {
    title: "Cà tím nướng mỡ hành",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 20,
    tags: ["Vietnamese", "Trưa", "Tối", "Rau", "Món nướng", "Nướng"],
    calories: 190,
    protein: 4,
    fat: 12,
    carbs: 18,
    ingredients: ["cà tím", "hành lá", "đậu phộng", "nước mắm", "dầu ăn"],
    instructions: [
      "Cà tím để nguyên quả nướng chín mềm trên lửa.",
      "Lột vỏ sơ, rưới mỡ hành thơm và đậu phộng giã."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cà tím nướng mềm thơm, phủ mỡ hành và đậu phộng."
  },
  {
    title: "Nộm rau muống thịt bò",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 25,
    tags: ["Vietnamese", "Trưa", "Tối", "Gỏi/Nộm", "Món bò", "Trộn gỏi"],
    calories: 280,
    protein: 22,
    fat: 10,
    carbs: 24,
    ingredients: ["rau muống", "thịt bò", "đậu phộng", "chanh", "tỏi", "đường"],
    instructions: [
      "Rau muống chẻ chuốt luộc chín tới, ngâm nước đá giòn.",
      "Thịt bò xào tái. Trộn chung rau muống, thịt bò với nước mắm chanh tỏi ớt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Rau muống giòn trộn bò, vị chua ngọt dễ ăn."
  },
  {
    title: "Dưa leo trộn tai heo",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 30,
    tags: ["Vietnamese", "Trưa", "Tối", "Gỏi/Nộm", "Món heo", "Luộc và trộn"],
    calories: 290,
    protein: 20,
    fat: 16,
    carbs: 16,
    ingredients: ["tai heo", "dưa leo", "cà rốt", "rau răm", "chanh", "đậu phộng"],
    instructions: [
      "Tai heo luộc chín giòn, thái mỏng. Dưa leo bỏ ruột thái lát.",
      "Trộn đều tai heo, dưa leo với nước mắm chua ngọt và rau răm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Món trộn giòn sần sật, vị chua ngọt cân bằng."
  },
  {
    title: "Phở bò tái",
    category: "Breakfast",
    rating: 5,
    estimatedTime: 60,
    tags: ["Vietnamese", "Sáng", "Trưa", "Món nước", "Bò", "Hầm nước dùng", "Miền Bắc"],
    calories: 480,
    protein: 34,
    fat: 12,
    carbs: 58,
    ingredients: ["bánh phở", "thịt bò", "xương bò", "hành", "gia vị phở", "quế", "hồi"],
    instructions: [
      "Hầm xương bò cùng hành gừng nướng và gia vị phở trong nhiều giờ để lấy nước dùng trong ngọt.",
      "Chần bánh phở vào tô, xếp thịt bò tái lên trên, chan nước dùng sôi sùng sục và rắc hành ngò."
    ],
    imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Phở bò nước trong thơm, thịt tái mềm và bánh phở dai."
  },
  {
    title: "Phở gà",
    category: "Breakfast",
    rating: 5,
    estimatedTime: 45,
    tags: ["Vietnamese", "Sáng", "Trưa", "Món nước", "Gà", "Luộc và hầm"],
    calories: 440,
    protein: 32,
    fat: 10,
    carbs: 56,
    ingredients: ["bánh phở", "gà ta", "gừng", "hành tây", "rau thơm", "lá chanh"],
    instructions: [
      "Luộc gà ta với gừng hành nướng để làm nước dùng ngọt thanh.",
      "Thịt gà xé phay. Xếp bánh phở, thịt gà ra tô rồi chan nước dùng nóng."
    ],
    imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Phở gà thanh vị, nước dùng ngọt từ gà và gia vị nướng."
  },
  {
    title: "Bún bò Huế",
    category: "Breakfast",
    rating: 5,
    estimatedTime: 60,
    tags: ["Vietnamese", "Sáng", "Trưa", "Tối", "Món nước", "Bò", "Hầm nước dùng", "Miền Trung"],
    calories: 560,
    protein: 38,
    fat: 18,
    carbs: 62,
    ingredients: ["bún bò", "bắp bò", "giò heo", "sả", "mắm ruốc", "sa tế", "chả cua"],
    instructions: [
      "Hầm xương bò và giò heo với sả đập dập và mắm ruốc Huế.",
      "Pha chế nước dùng cay thơm đặc trưng với sa tế.",
      "Dọn bún với bắp bò, giò heo, chả cua và rau sống phong phú."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Tô bún cay thơm sả, nước dùng đậm kiểu Huế."
  },
  {
    title: "Bún riêu cua",
    category: "Breakfast",
    rating: 5,
    estimatedTime: 45,
    tags: ["Vietnamese", "Sáng", "Trưa", "Món nước", "Món cua", "Nấu nước dùng", "Miền Bắc"],
    calories: 490,
    protein: 28,
    fat: 15,
    carbs: 60,
    ingredients: ["bún", "cua đồng", "cà chua", "đậu hũ", "mắm tôm", "hành phi"],
    instructions: [
      "Lọc thịt cua đồng nấu đông thành riêu. Xào cà chua tạo màu.",
      "Nấu nước dùng thanh vị me và cà chua, thêm đậu hũ chiên."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bún riêu chua nhẹ, riêu cua mềm và đậu hũ chiên."
  },
  {
    title: "Bún mắm miền Tây",
    category: "Lunch",
    rating: 4.8,
    estimatedTime: 50,
    tags: ["Vietnamese", "Trưa", "Tối", "Món nước", "Hải sản", "Nấu nước dùng", "Miền Nam"],
    calories: 580,
    protein: 36,
    fat: 18,
    carbs: 64,
    ingredients: ["bún", "mắm cá linh/sặc", "heo quay", "tôm", "mực", "sả", "cà tím"],
    instructions: [
      "Nấu mắm cá với nước lọc và sả rồi lọc lấy nước cốt thơm.",
      "Thêm heo quay, tôm, mực và cà tím vào nấu chung.",
      "Ăn kèm rau đắng, bông súng và rau nhút."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bún mắm đậm mùi đặc trưng, nhiều topping và rau miền Tây."
  },
  {
    title: "Bún chả Hà Nội",
    category: "Lunch",
    rating: 5,
    estimatedTime: 40,
    tags: ["Vietnamese", "Trưa", "Tối", "Bún", "Món nướng", "Nướng", "Miền Bắc"],
    calories: 590,
    protein: 34,
    fat: 26,
    carbs: 58,
    ingredients: ["bún", "thịt heo", "chả viên", "nước mắm", "đu đủ xanh", "su hào", "tỏi ớt"],
    instructions: [
      "Thịt ba chỉ thái miếng và thịt băm viên nặn tròn, ướp gia vị đậm đà rồi nướng trên than hoa.",
      "Pha nước chấm ấm ngọt với đồ chua (su hào, đu đủ).",
      "Ăn bún cùng thịt nướng và rau sống."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bún ăn cùng thịt nướng và nước chấm chua ngọt."
  },
  {
    title: "Bún thịt nướng",
    category: "Lunch",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Trưa", "Tối", "Bún", "Món nướng", "Nướng", "Miền Nam"],
    calories: 570,
    protein: 32,
    fat: 22,
    carbs: 62,
    ingredients: ["bún", "thịt heo", "sả", "đậu phộng", "rau sống", "đồ chua"],
    instructions: [
      "Thịt heo ướp sả nướng thơm lừng.",
      "Xếp bún, rau sống, đồ chua, thịt nướng và chan nước mắm chua ngọt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Tô bún khô với thịt nướng thơm sả, rau và nước mắm."
  },
  {
    title: "Bún đậu mắm tôm",
    category: "Lunch",
    rating: 4.9,
    estimatedTime: 30,
    tags: ["Vietnamese", "Trưa", "Tối", "Bún", "Món chiên", "Chiên và luộc", "Miền Bắc"],
    calories: 620,
    protein: 35,
    fat: 30,
    carbs: 54,
    ingredients: ["bún lá", "đậu hũ", "thịt luộc", "chả cốm", "mắm tôm", "rau kinh giới"],
    instructions: [
      "Đậu hũ cắt vuông chiên giòn rụm. Chả cốm chiên vàng.",
      "Luộc thịt ba chỉ thái lát. Pha mắm tôm đánh bông với đường, chanh, ớt.",
      "Bày mẹt bún với rau kinh giới và dưa leo."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Mẹt bún đậu nhiều món, chấm mắm tôm đánh bông."
  },
  {
    title: "Bún cá Nha Trang",
    category: "Breakfast",
    rating: 4.8,
    estimatedTime: 35,
    tags: ["Vietnamese", "Sáng", "Trưa", "Món nước", "Món cá", "Nấu nước dùng", "Miền Trung"],
    calories: 420,
    protein: 30,
    fat: 8,
    carbs: 58,
    ingredients: ["bún", "cá thu", "chả cá", "cà chua", "dứa", "hành lá"],
    instructions: [
      "Nấu nước dùng từ xương cá, cà chua và dứa cho ngọt thanh.",
      "Thêm cá thu và chả cá chiên dai ngon vào tô bún."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bún cá thanh ngọt, chả cá dai và nước dùng trong."
  },
  {
    title: "Bánh canh cua",
    category: "Lunch",
    rating: 4.9,
    estimatedTime: 45,
    tags: ["Vietnamese", "Sáng", "Trưa", "Tối", "Món nước", "Hải sản", "Nấu sánh"],
    calories: 540,
    protein: 35,
    fat: 16,
    carbs: 64,
    ingredients: ["bánh canh", "cua", "tôm", "giò heo", "hành lá", "màu điều"],
    instructions: [
      "Nấu nước dùng sánh từ xương giò và thịt cua ngọt đậm.",
      "Cho sợi bánh canh bột lọc/bột gạo vào nấu chín tới cùng tôm và thịt cua."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bánh canh sợi mềm, nước dùng hơi sánh và nhiều hải sản."
  },
  {
    title: "Bánh canh giò heo",
    category: "Lunch",
    rating: 4.8,
    estimatedTime: 50,
    tags: ["Vietnamese", "Sáng", "Trưa", "Tối", "Món nước", "Món heo", "Hầm"],
    calories: 580,
    protein: 32,
    fat: 22,
    carbs: 64,
    ingredients: ["bánh canh", "giò heo", "xương heo", "hành lá", "tiêu"],
    instructions: [
      "Hầm giò heo nhừ mềm trong nước dùng trong ngọt.",
      "Chan vào tô bánh canh dai ngon."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Giò heo hầm mềm, nước dùng ngọt, sợi bánh canh dai."
  },
  {
    title: "Hủ tiếu Nam Vang",
    category: "Breakfast",
    rating: 4.9,
    estimatedTime: 45,
    tags: ["Vietnamese", "Sáng", "Trưa", "Món nước", "Hủ tiếu", "Hầm nước dùng", "Miền Nam"],
    calories: 510,
    protein: 32,
    fat: 12,
    carbs: 66,
    ingredients: ["hủ tiếu", "tôm", "thịt băm", "gan heo", "xương heo", "trứng cút"],
    instructions: [
      "Hầm xương heo kỹ lấy nước dùng trong.",
      "Trần hủ tiếu dai, thêm tôm luộc, thịt băm xào, gan và trứng cút."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Hủ tiếu nước trong ngọt, nhiều topping kiểu Nam Vang."
  },
  {
    title: "Hủ tiếu bò kho",
    category: "Breakfast",
    rating: 4.9,
    estimatedTime: 50,
    tags: ["Vietnamese", "Sáng", "Trưa", "Tối", "Món nước", "Bò", "Kho và hầm"],
    calories: 590,
    protein: 36,
    fat: 24,
    carbs: 60,
    ingredients: ["hủ tiếu", "thịt bò", "cà rốt", "sả", "ngũ vị hương", "hoa hồi"],
    instructions: [
      "Nấu bò kho đậm đà ngũ vị với cà rốt và sả.",
      "Dùng với hủ tiếu dai hoặc bánh mì."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bò kho thơm gia vị, dùng với hủ tiếu dai và rau thơm."
  },
  {
    title: "Mì Quảng gà",
    category: "Lunch",
    rating: 4.9,
    estimatedTime: 40,
    tags: ["Vietnamese", "Sáng", "Trưa", "Tối", "Mì", "Món gà", "Rim và chan nước dùng", "Miền Trung"],
    calories: 530,
    protein: 34,
    fat: 16,
    carbs: 62,
    ingredients: ["mì Quảng", "gà", "nghệ", "đậu phộng", "bánh tráng mè", "rau sống"],
    instructions: [
      "Gà chặt miếng ướp nghệ rồi rim săn đậm đà với ít nước dùng.",
      "Trần mì Quảng ra tô, chan nước rim xâm xấp, rắc đậu phộng rang."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Mì Quảng ít nước, gà thấm nghệ và rau sống phong phú."
  },
  {
    title: "Mì Quảng tôm thịt",
    category: "Lunch",
    rating: 4.9,
    estimatedTime: 40,
    tags: ["Vietnamese", "Sáng", "Trưa", "Tối", "Mì", "Tôm thịt", "Rim và chan nước dùng", "Miền Trung"],
    calories: 520,
    protein: 32,
    fat: 15,
    carbs: 64,
    ingredients: ["mì Quảng", "tôm", "thịt heo", "trứng cút", "đậu phộng", "hành tỏi"],
    instructions: [
      "Rim tôm và thịt heo với nước màu nghệ cho thấm vị.",
      "Chan nước sốt sền sệt lên mì Quảng cùng rau sống bắp chuối."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Tô mì màu vàng nghệ, tôm thịt đậm vị và nước dùng vừa đủ."
  },
  {
    title: "Cao lầu Hội An",
    category: "Lunch",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Trưa", "Tối", "Mì", "Món heo", "Xá xíu và trộn", "Miền Trung"],
    calories: 510,
    protein: 30,
    fat: 14,
    carbs: 65,
    ingredients: ["sợi cao lầu", "thịt xá xíu", "rau sống", "giá", "da heo giòn"],
    instructions: [
      "Sợi cao lầu đặc trưng trộn với thịt xá xíu thơm lừng, nước sốt đậm đà và da heo chiên giòn."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Món mì khô Hội An với sợi dai, thịt xá xíu và rau thơm."
  },
  {
    title: "Mì xào bò",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 20,
    tags: ["Vietnamese", "Sáng", "Trưa", "Tối", "Mì xào", "Món bò", "Xào"],
    calories: 540,
    protein: 28,
    fat: 18,
    carbs: 66,
    ingredients: ["mì trứng", "thịt bò", "cải ngọt", "cà rốt", "tỏi", "dầu hào"],
    instructions: [
      "Mì chần chín tới. Xào thịt bò và rau cải ngọt nhanh tay trên lửa lớn.",
      "Cho mì vào đảo đều cùng dầu hào."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Mì xào nhanh, bò mềm và rau xanh giòn."
  },
  {
    title: "Miến gà",
    category: "Breakfast",
    rating: 4.8,
    estimatedTime: 30,
    tags: ["Vietnamese", "Sáng", "Trưa", "Món nước", "Gà", "Nấu nước dùng"],
    calories: 390,
    protein: 28,
    fat: 8,
    carbs: 52,
    ingredients: ["miến dong", "gà", "nấm hương", "măng khô", "hành lá"],
    instructions: [
      "Nấu nước dùng ngọt từ gà và măng khô.",
      "Miến ngâm mềm trần vào tô cùng gà xé."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Miến trong, nước gà ngọt, hợp bữa sáng nhẹ."
  },
  {
    title: "Cháo gà",
    category: "Breakfast",
    rating: 4.9,
    estimatedTime: 40,
    tags: ["Vietnamese", "Sáng", "Tối", "Cháo", "Gà", "Nấu cháo"],
    calories: 380,
    protein: 26,
    fat: 8,
    carbs: 50,
    ingredients: ["gạo", "gà", "gừng", "hành lá", "tiêu"],
    instructions: [
      "Rang thơm gạo rồi ninh nhừ cùng gà ta và gừng đập dập.",
      "Gà xé phay trộn gỏi hành tây."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cháo mềm thơm gừng, gà xé và hành lá."
  },
  {
    title: "Cháo sườn",
    category: "Breakfast",
    rating: 4.8,
    estimatedTime: 45,
    tags: ["Vietnamese", "Sáng", "Tối", "Cháo", "Món heo", "Hầm cháo"],
    calories: 410,
    protein: 24,
    fat: 12,
    carbs: 52,
    ingredients: ["gạo", "sườn non", "hành lá", "tiêu", "nước mắm"],
    instructions: [
      "Ninh sườn non và gạo tẻ nhừ nhuyễn mịn như bột.",
      "Ăn kèm quẩy giòn."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cháo mịn, sườn mềm, dễ ăn cho bữa sáng hoặc tối nhẹ."
  },
  {
    title: "Cháo lòng",
    category: "Breakfast",
    rating: 4.8,
    estimatedTime: 50,
    tags: ["Vietnamese", "Sáng", "Trưa", "Cháo", "Món heo", "Nấu cháo"],
    calories: 460,
    protein: 28,
    fat: 18,
    carbs: 48,
    ingredients: ["gạo", "lòng heo", "huyết", "gừng", "rau răm"],
    instructions: [
      "Luộc các bộ phận lòng heo thật sạch. Dùng nước luộc nấu cháo thơm ngon."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cháo lòng đậm vị, ăn nóng với rau thơm và tiêu."
  },
  {
    title: "Cháo cá lóc",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 35,
    tags: ["Vietnamese", "Sáng", "Tối", "Cháo", "Món cá", "Nấu cháo"],
    calories: 390,
    protein: 27,
    fat: 9,
    carbs: 50,
    ingredients: ["gạo", "cá lóc", "nấm rơm", "hành", "gừng"],
    instructions: [
      "Phi gừng hành, xào thịt cá lóc phi lê. Nấu cháo nhừ rồi cho cá và nấm vào."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cháo cá ngọt thanh, cá lóc mềm và ít tanh nhờ gừng."
  },
  {
    title: "Xôi gà xé",
    category: "Breakfast",
    rating: 4.9,
    estimatedTime: 35,
    tags: ["Vietnamese", "Sáng", "Trưa", "Xôi", "Gà", "Hấp"],
    calories: 490,
    protein: 26,
    fat: 14,
    carbs: 65,
    ingredients: ["nếp", "gà", "hành phi", "mỡ gà", "lá chanh"],
    instructions: [
      "Đồ nếp dẻo thơm nước cốt dừa và mỡ gà.",
      "Xếp gà xé phay, hành phi thơm lừng lên trên."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Xôi dẻo, gà xé thơm, hợp bữa sáng chắc bụng."
  },
  {
    title: "Xôi mặn thập cẩm",
    category: "Breakfast",
    rating: 4.9,
    estimatedTime: 35,
    tags: ["Vietnamese", "Sáng", "Trưa", "Xôi", "Món mặn", "Hấp và áp chảo"],
    calories: 530,
    protein: 24,
    fat: 18,
    carbs: 68,
    ingredients: ["nếp", "lạp xưởng", "chà bông", "trứng cút", "hành phi", "mỡ hành"],
    instructions: [
      "Nếp hấp chín dẻo. Thêm lạp xưởng hấp thái mỏng, chà bông, trứng cút."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Xôi mặn nhiều topping, tiện cho bữa sáng mang đi."
  },
  {
    title: "Xôi bắp",
    category: "Breakfast",
    rating: 4.7,
    estimatedTime: 30,
    tags: ["Vietnamese", "Sáng", "Ăn nhẹ", "Xôi", "Món ngọt", "Hấp"],
    calories: 420,
    protein: 10,
    fat: 10,
    carbs: 72,
    ingredients: ["nếp", "bắp", "đậu xanh", "dừa nạo", "đường"],
    instructions: [
      "Bắp nếp luộc mềm trộn cùng nếp đồ chín. Rắc đậu xanh quết nhuyễn và dừa nạo."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Xôi bắp dẻo ngọt, thơm dừa và đậu xanh."
  },
  {
    title: "Xôi xéo",
    category: "Breakfast",
    rating: 4.8,
    estimatedTime: 35,
    tags: ["Vietnamese", "Sáng", "Xôi", "Món chay", "Hấp", "Miền Bắc"],
    calories: 460,
    protein: 12,
    fat: 16,
    carbs: 68,
    ingredients: ["nếp", "đậu xanh", "hành phi", "mỡ hành"],
    instructions: [
      "Nếp đồ nghệ vàng dẻo quánh. Đậu xanh giã mịn nắm tròn thái mỏng phủ lên xôi cùng hành phi mỡ vàng."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Xôi vàng mềm, đậu xanh mịn và hành phi thơm."
  },
  {
    title: "Bánh mì thịt",
    category: "Breakfast",
    rating: 5,
    estimatedTime: 10,
    tags: ["Vietnamese", "Sáng", "Trưa", "Ăn nhẹ", "Bánh mì", "Món heo", "Kẹp"],
    calories: 450,
    protein: 20,
    fat: 16,
    carbs: 55,
    ingredients: ["bánh mì", "thịt nguội", "pate", "đồ chua", "rau thơm", "dưa leo"],
    instructions: [
      "Nướng bánh mì giòn nóng.",
      "Phết pate gan thơm lừng, kẹp thịt nguội, chả lụa, đồ chua, dưa leo và rau ngò."
    ],
    imageUrl: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Ổ bánh mì giòn với pate, thịt nguội và đồ chua."
  },
  {
    title: "Bánh mì ốp la",
    category: "Breakfast",
    rating: 4.9,
    estimatedTime: 10,
    tags: ["Vietnamese", "Sáng", "Bánh mì", "Món trứng", "Ốp chảo"],
    calories: 390,
    protein: 16,
    fat: 18,
    carbs: 42,
    ingredients: ["bánh mì", "trứng", "pate", "xì dầu", "hành ngò"],
    instructions: [
      "Chiên trứng ốp la lòng đào trên chảo nhỏ.",
      "Kẹp vào bánh mì cùng pate và xì dầu."
    ],
    imageUrl: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bánh mì ăn cùng trứng ốp la nóng, nhanh và đủ năng lượng."
  },
  {
    title: "Bánh mì xíu mại",
    category: "Breakfast",
    rating: 4.9,
    estimatedTime: 25,
    tags: ["Vietnamese", "Sáng", "Ăn nhẹ", "Bánh mì", "Món heo", "Nấu sốt"],
    calories: 440,
    protein: 22,
    fat: 16,
    carbs: 50,
    ingredients: ["bánh mì", "thịt băm", "cà chua", "hành tây", "pate"],
    instructions: [
      "Nặn thịt băm thành viên xíu mại, nấu trong sốt cà chua sền sệt đậm đà.",
      "Chấm bánh mì giòn."
    ],
    imageUrl: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Xíu mại mềm trong sốt cà, chấm bánh mì nóng."
  },
  {
    title: "Bánh cuốn chả lụa",
    category: "Breakfast",
    rating: 4.9,
    estimatedTime: 30,
    tags: ["Vietnamese", "Sáng", "Trưa", "Bánh", "Món hấp", "Tráng hấp", "Miền Bắc"],
    calories: 380,
    protein: 16,
    fat: 10,
    carbs: 54,
    ingredients: ["bột gạo", "thịt băm", "mộc nhĩ", "chả lụa", "hành phi"],
    instructions: [
      "Tráng bột gạo mỏng trên nồi hơi nước sôi, nhân thịt mộc nhĩ.",
      "Cuốn tròn dọn cùng chả lụa và nước mắm pha."
    ],
    imageUrl: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bánh cuốn mỏng mềm, nhân thịt nấm và nước mắm pha."
  },
  {
    title: "Bánh ướt lòng gà",
    category: "Breakfast",
    rating: 4.8,
    estimatedTime: 25,
    tags: ["Vietnamese", "Sáng", "Trưa", "Bánh", "Gà", "Hấp và trộn"],
    calories: 410,
    protein: 24,
    fat: 12,
    carbs: 50,
    ingredients: ["bánh ướt", "lòng gà", "gà xé", "hành phi", "rau răm"],
    instructions: [
      "Bánh ướt mềm xếp ra đĩa, phủ lòng gà và gà xé trộn chua ngọt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bánh ướt mềm ăn cùng lòng gà và nước mắm chua ngọt."
  },
  {
    title: "Bánh xèo miền Tây",
    category: "Dinner",
    rating: 5,
    estimatedTime: 40,
    tags: ["Vietnamese", "Trưa", "Tối", "Bánh", "Món chiên", "Chiên", "Miền Nam"],
    calories: 580,
    protein: 22,
    fat: 26,
    carbs: 64,
    ingredients: ["bột gạo", "tôm", "thịt heo", "giá", "nghệ", "nước cốt dừa"],
    instructions: [
      "Pha bột bánh xèo với nghệ và nước cốt dừa.",
      "Đổ bánh xèo mỏng giòn trên chảo nóng với nhân tôm thịt giá đỗ.",
      "Cuốn rau sống chấm nước mắm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bánh xèo vàng giòn, cuốn rau sống chấm nước mắm."
  },
  {
    title: "Bánh khọt",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 35,
    tags: ["Vietnamese", "Ăn nhẹ", "Tối", "Bánh", "Hải sản", "Đổ khuôn chiên"],
    calories: 460,
    protein: 18,
    fat: 22,
    carbs: 48,
    ingredients: ["bột gạo", "tôm", "nước cốt dừa", "hành lá", "nghệ"],
    instructions: [
      "Đổ bánh khọt trong khuôn gang nhỏ với tôm tươi ở giữa.",
      "Ăn kèm rau sống và nước mắm chua ngọt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bánh nhỏ giòn viền, nhân tôm và mỡ hành."
  },
  {
    title: "Bánh căn trứng",
    category: "Breakfast",
    rating: 4.8,
    estimatedTime: 30,
    tags: ["Vietnamese", "Sáng", "Ăn nhẹ", "Tối", "Bánh", "Món trứng", "Đổ khuôn"],
    calories: 420,
    protein: 18,
    fat: 18,
    carbs: 46,
    ingredients: ["bột gạo", "trứng cút", "hành lá", "nước mắm", "xíu mại"],
    instructions: [
      "Đổ bánh căn trong khuôn đất nung nhỏ, đập trứng cút lên trên.",
      "Chấm nước mắm xíu mại."
    ],
    imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bánh căn nóng, mềm giòn nhẹ, ăn cùng nước chấm."
  },
  {
    title: "Bánh bèo Huế",
    category: "Lunch",
    rating: 4.8,
    estimatedTime: 30,
    tags: ["Vietnamese", "Ăn nhẹ", "Trưa", "Bánh", "Món hấp", "Hấp", "Miền Trung"],
    calories: 320,
    protein: 12,
    fat: 8,
    carbs: 50,
    ingredients: ["bột gạo", "tôm khô", "hành phi", "mỡ hành", "nước mắm"],
    instructions: [
      "Đổ bột vào chén nhỏ hấp chín tạo xoáy giữa.",
      "Phủ tôm cháy màu gạch và mỡ hành."
    ],
    imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Chén bánh bèo mềm, phủ tôm chấy và nước mắm ngọt."
  },
  {
    title: "Bánh hỏi heo quay",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 25,
    tags: ["Vietnamese", "Trưa", "Tối", "Bánh hỏi", "Món heo", "Quay và hấp"],
    calories: 590,
    protein: 30,
    fat: 32,
    carbs: 45,
    ingredients: ["bánh hỏi", "heo quay", "mỡ hành", "rau sống", "nước mắm"],
    instructions: [
      "Bánh hỏi phết mỡ hành thơm. Ăn cùng heo quay giòn da và rau sống."
    ],
    imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bánh hỏi mềm ăn cùng heo quay giòn da và rau sống."
  },
  {
    title: "Gỏi cuốn tôm thịt",
    category: "Lunch",
    rating: 5,
    estimatedTime: 25,
    tags: ["Vietnamese", "Ăn nhẹ", "Trưa", "Tối", "Cuốn", "Tôm thịt", "Luộc và cuốn"],
    calories: 320,
    protein: 20,
    fat: 8,
    carbs: 42,
    ingredients: ["bánh tráng", "tôm", "thịt heo", "bún", "rau sống", "hẹ"],
    instructions: [
      "Luộc chín tôm và thịt ba chỉ thái mỏng.",
      "Cuốn bánh tráng với bún, rau sống, tôm và thịt thật chặt tay.",
      "Chấm tương đậu hoặc nước mắm chua ngọt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cuốn tươi mát với tôm thịt, bún và rau thơm."
  },
  {
    title: "Nem rán chả giò",
    category: "Dinner",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Trưa", "Tối", "Ăn nhẹ", "Món chiên", "Món heo", "Chiên"],
    calories: 490,
    protein: 22,
    fat: 26,
    carbs: 44,
    ingredients: ["bánh tráng", "thịt băm", "miến", "mộc nhĩ", "cà rốt", "trứng"],
    instructions: [
      "Trộn đều nhân thịt băm, miến ngâm mềm, mộc nhĩ băm và cà rốt.",
      "Cuốn bánh tráng thành hình trụ rồi chiên ngập dầu đến khi vàng giòn."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Chả giò vàng giòn, nhân thịt rau củ đậm vị."
  },
  {
    title: "Nem nướng Nha Trang",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 40,
    tags: ["Vietnamese", "Trưa", "Tối", "Ăn nhẹ", "Món nướng", "Món heo", "Nướng", "Miền Trung"],
    calories: 520,
    protein: 28,
    fat: 24,
    carbs: 48,
    ingredients: ["thịt heo xay", "que tre", "bánh tráng", "rau sống", "đậu phộng"],
    instructions: [
      "Thịt heo quết dẻo quánh, quấn quanh que tre nướng thơm phức trên than hồng."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Nem nướng thơm, cuốn bánh tráng với rau và đồ chua."
  },
  {
    title: "Chạo tôm",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 35,
    tags: ["Vietnamese", "Ăn nhẹ", "Tối", "Món nướng", "Hải sản", "Quết và nướng"],
    calories: 430,
    protein: 26,
    fat: 16,
    carbs: 44,
    ingredients: ["tôm", "mía", "giò sống", "tỏi", "tiêu"],
    instructions: [
      "Tôm quết nhuyễn cùng giò sống, bọc quanh khúc mía rồi nướng vàng."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Tôm quết bọc mía, nướng thơm và ngọt nhẹ."
  },
  {
    title: "Gỏi gà rau răm",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 30,
    tags: ["Vietnamese", "Trưa", "Tối", "Gỏi/Nộm", "Gà", "Luộc và trộn"],
    calories: 360,
    protein: 28,
    fat: 14,
    carbs: 26,
    ingredients: ["gà", "hành tây", "rau răm", "chanh", "đậu phộng"],
    instructions: [
      "Gà luộc xé phay trộn đều với hành tây thái mỏng, rau răm và nước mắm chua ngọt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Gỏi gà chua ngọt, rau răm thơm, thịt gà xé mềm."
  },
  {
    title: "Gỏi xoài tôm khô",
    category: "Lunch",
    rating: 4.8,
    estimatedTime: 20,
    tags: ["Vietnamese", "Ăn nhẹ", "Trưa", "Tối", "Gỏi/Nộm", "Hải sản", "Trộn gỏi"],
    calories: 310,
    protein: 18,
    fat: 10,
    carbs: 36,
    ingredients: ["xoài xanh", "tôm khô", "rau răm", "đậu phộng", "nước mắm"],
    instructions: [
      "Xoài xanh bào sợi. Tôm khô ngâm mềm giã sơ.",
      "Trộn xoài và tôm khô với nước mắm đường tỏi ớt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Xoài xanh giòn chua, tôm khô mặn ngọt, rất bắt vị."
  },
  {
    title: "Gỏi ngó sen tôm thịt",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 30,
    tags: ["Vietnamese", "Trưa", "Tối", "Gỏi/Nộm", "Tôm thịt", "Luộc và trộn"],
    calories: 330,
    protein: 22,
    fat: 10,
    carbs: 38,
    ingredients: ["ngó sen", "tôm", "thịt heo", "cà rốt", "rau răm"],
    instructions: [
      "Ngó sen cắt khúc ngâm giấm đường cho giòn trắng.",
      "Trộn cùng tôm thịt luộc và nước mắm chua ngọt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Gỏi ngó sen giòn, vị chua ngọt thanh và nhiều màu."
  },
  {
    title: "Thịt kho tiêu",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 35,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món kho", "Kho"],
    calories: 560,
    protein: 32,
    fat: 30,
    carbs: 12,
    ingredients: ["thịt heo", "tiêu", "nước mắm", "đường", "hành tím"],
    instructions: [
      "Thịt ba chỉ thái vuông kho nhỏ lửa với nước mắm và thật nhiều tiêu sọ."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Thịt kho nhỏ lửa, thơm tiêu, sốt mặn ngọt sánh."
  },
  {
    title: "Cá bống kho tiêu",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 40,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món cá", "Kho"],
    calories: 420,
    protein: 34,
    fat: 14,
    carbs: 10,
    ingredients: ["cá bống", "tiêu", "nước mắm", "ớt", "nước màu"],
    instructions: [
      "Cá bống tươi kho tộ liu riu với tiêu hạt và nước mắm ngon."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cá bống kho chắc thịt, thơm tiêu, rất đưa cơm."
  },
  {
    title: "Cá lóc kho tộ",
    category: "Dinner",
    rating: 5,
    estimatedTime: 45,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món cá", "Kho tộ"],
    calories: 470,
    protein: 36,
    fat: 16,
    carbs: 10,
    ingredients: ["cá lóc", "nước mắm", "tiêu", "ớt", "hành tím"],
    instructions: [
      "Cá lóc cắt khúc kho trong nồi đất với nước mắm và tiêu sọ."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Cá lóc kho nồi đất, thịt chắc và sốt đậm vị."
  },
  {
    title: "Tôm rim thịt ba chỉ",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 30,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Tôm thịt", "Rim"],
    calories: 490,
    protein: 32,
    fat: 22,
    carbs: 14,
    ingredients: ["tôm", "thịt ba chỉ", "nước mắm", "đường", "tỏi"],
    instructions: [
      "Rim tôm cùng thịt ba chỉ thái nhỏ đến khi keo lại sậm màu đẹp mắt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Tôm rim cùng ba chỉ, vị mặn ngọt và màu đẹp."
  },
  {
    title: "Mực xào chua ngọt",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 20,
    tags: ["Vietnamese", "Trưa", "Tối", "Hải sản", "Món xào", "Xào"],
    calories: 380,
    protein: 28,
    fat: 12,
    carbs: 34,
    ingredients: ["mực", "dứa", "cà chua", "ớt chuông", "cần tây"],
    instructions: [
      "Mực khứa vảy rồng chần sơ. Xào nhanh với dứa, cà chua và ớt chuông."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Mực giòn xào rau củ chua ngọt, màu sắc hấp dẫn."
  },
  {
    title: "Nghêu hấp sả",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 15,
    tags: ["Vietnamese", "Trưa", "Tối", "Ăn nhẹ", "Hải sản", "Món hấp", "Hấp"],
    calories: 220,
    protein: 24,
    fat: 4,
    carbs: 12,
    ingredients: ["nghêu", "sả", "ớt", "gừng", "rau răm"],
    instructions: [
      "Nghêu rửa sạch hấp cùng sả đập dập và gừng thái lát."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Nghêu hấp thơm sả, nước ngọt tự nhiên."
  },
  {
    title: "Ốc len xào dừa",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 20,
    tags: ["Vietnamese", "Ăn nhẹ", "Tối", "Hải sản", "Món xào", "Xào", "Miền Nam"],
    calories: 390,
    protein: 18,
    fat: 24,
    carbs: 16,
    ingredients: ["ốc len", "nước cốt dừa", "sả", "ớt", "rau răm"],
    instructions: [
      "Ốc len chặt đít, xào thơm với sả ớt và nước cốt dừa béo ngậy."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Ốc béo thơm nước cốt dừa, món ăn vặt miền Nam."
  },
  {
    title: "Ếch xào sả ớt",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 25,
    tags: ["Vietnamese", "Trưa", "Tối", "Món xào", "Món đồng quê", "Xào"],
    calories: 340,
    protein: 30,
    fat: 14,
    carbs: 12,
    ingredients: ["ếch", "sả", "ớt", "tỏi", "nước mắm", "nghệ"],
    instructions: [
      "Thịt ếch cắt miếng ướp nghệ, xào săn thơm lừng với sả ớt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Ếch săn thịt, thơm sả ớt, hợp ăn cùng cơm nóng."
  },
  {
    title: "Gà nướng muối ớt",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 45,
    tags: ["Vietnamese", "Trưa", "Tối", "Món nướng", "Gà", "Nướng"],
    calories: 520,
    protein: 38,
    fat: 24,
    carbs: 8,
    ingredients: ["gà", "muối", "ớt", "tỏi", "sả"],
    instructions: [
      "Gà ướp hỗn hợp muối ớt tỏi giã nhuyễn rồi nướng vàng giòn trên than."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Gà nướng da vàng, cay thơm vừa phải."
  },
  {
    title: "Gà hấp lá chanh",
    category: "Dinner",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Trưa", "Tối", "Món hấp", "Gà", "Hấp"],
    calories: 410,
    protein: 36,
    fat: 14,
    carbs: 4,
    ingredients: ["gà", "lá chanh", "gừng", "muối", "tiêu"],
    instructions: [
      "Gà ta hấp chín với gừng và lá chanh tươi giữ trọn vị ngọt thơm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Gà hấp giữ vị ngọt, thơm lá chanh và gừng."
  },
  {
    title: "Vịt kho gừng",
    category: "Dinner",
    rating: 4.8,
    estimatedTime: 45,
    tags: ["Vietnamese", "Trưa", "Tối", "Cơm gia đình", "Món vịt", "Kho"],
    calories: 540,
    protein: 34,
    fat: 28,
    carbs: 10,
    ingredients: ["vịt", "gừng", "nước mắm", "rượu trắng", "hành tím"],
    instructions: [
      "Vịt khử mùi bằng gừng rượu, chặt miếng kho nhừ với gừng tươi thái lát."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Vịt kho mềm, thơm gừng, giảm mùi và đậm vị."
  },
  {
    title: "Vịt nấu chao",
    category: "Dinner",
    rating: 5,
    estimatedTime: 60,
    tags: ["Vietnamese", "Trưa", "Tối", "Món nước", "Món vịt", "Nấu lẩu", "Miền Nam"],
    calories: 620,
    protein: 36,
    fat: 35,
    carbs: 22,
    ingredients: ["vịt", "chao", "khoai môn", "nước dừa", "rau muống"],
    instructions: [
      "Vịt ướp chao thấm vị, xào săn với khoai môn rồi nấu lẩu nước dừa."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Vịt nấu chao béo thơm, ăn kèm rau và bún."
  },
  {
    title: "Lẩu thái hải sản kiểu Việt",
    category: "Dinner",
    rating: 5,
    estimatedTime: 45,
    tags: ["Vietnamese", "Tối", "Lẩu", "Hải sản", "Nấu lẩu"],
    calories: 580,
    protein: 38,
    fat: 20,
    carbs: 45,
    ingredients: ["tôm", "mực", "nghêu", "nấm", "sả", "riềng", "lá chanh"],
    instructions: [
      "Nấu nước lẩu chua cay chuẩn vị Thái với sả riềng lá chanh.",
      "Nhúng hải sản và rau nấm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Nồi lẩu chua cay, nhiều hải sản và rau ăn kèm."
  },
  {
    title: "Lẩu cá kèo",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 40,
    tags: ["Vietnamese", "Tối", "Lẩu", "Món cá", "Nấu lẩu", "Miền Nam"],
    calories: 460,
    protein: 32,
    fat: 14,
    carbs: 40,
    ingredients: ["cá kèo", "lá giang", "rau đắng", "bún", "sả"],
    instructions: [
      "Nấu nước lẩu chua thanh bằng lá giang tươi. Thả cá kèo sống vào nồi cùng rau đắng."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Lẩu cá kèo chua thanh, rau đắng tạo vị miền Tây."
  },
  {
    title: "Lẩu gà lá é",
    category: "Dinner",
    rating: 5,
    estimatedTime: 45,
    tags: ["Vietnamese", "Tối", "Lẩu", "Gà", "Nấu lẩu"],
    calories: 510,
    protein: 36,
    fat: 18,
    carbs: 42,
    ingredients: ["gà", "lá é", "măng", "nấm", "ớt xiêm xanh"],
    instructions: [
      "Nấu lẩu gà với măng tươi và giã nhuyễn thật nhiều lá é cùng ớt xiêm xanh."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Lẩu gà thơm lá é, cay nhẹ, nước dùng ngọt."
  },
  {
    title: "Bò nhúng giấm",
    category: "Dinner",
    rating: 4.9,
    estimatedTime: 40,
    tags: ["Vietnamese", "Tối", "Lẩu/Cuốn", "Món bò", "Nhúng và cuốn", "Miền Nam"],
    calories: 520,
    protein: 34,
    fat: 18,
    carbs: 48,
    ingredients: ["thịt bò", "giấm", "bánh tráng", "dứa", "rau sống", "chuối chát"],
    instructions: [
      "Nấu nước giấm dừa thanh dịu. Nhúng thịt bò tái rồi cuốn bánh tráng rau sống mắm nêm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bò nhúng nước giấm chua dịu, cuốn bánh tráng rau sống."
  },
  {
    title: "Bò lá lốt",
    category: "Dinner",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Trưa", "Tối", "Ăn nhẹ", "Món nướng", "Món bò", "Nướng", "Miền Nam"],
    calories: 490,
    protein: 28,
    fat: 22,
    carbs: 42,
    ingredients: ["thịt bò", "lá lốt", "sả", "tỏi", "đậu phộng"],
    instructions: [
      "Thịt bò băm nhuyễn cuốn trong lá lốt rồi nướng trên than hồng thơm nức."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bò cuốn lá lốt nướng thơm, béo nhẹ và đậm vị."
  }
];
