import { Recipe } from './types';

export const NEW_LUNCH_20_RECIPES: Partial<Recipe>[] = [
  // 01. Cá Kho Tộ
  {
    title: "Cá Kho Tộ",
    category: "Lunch",
    rating: 5,
    estimatedTime: 40,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Hải Sản", "Kho"],
    winePairing: "Trà xanh ướp hoa lài ấm hoặc nước lọc mát",
    calories: 460,
    protein: 36,
    fat: 18,
    carbs: 8,
    ingredients: [
      "500g cá lóc (hoặc cá basa, cá bống, cá hú) cắt khúc dày",
      "150g thịt ba chỉ cắt miếng con chì",
      "3 muỗng canh nước mắm cốt cá cơm",
      "2 muỗng canh đường thốt nốt (hoặc đường vàng)",
      "1 muỗng cà phê nước màu dừa Bến Tre",
      "1 muỗng canh tiêu sọ giã dập và tiêu hạt xanh",
      "3 củ hành tím, 1 củ tỏi băm nhuyễn",
      "2 quả ớt hiểm đỏ, hành lá cắt khúc",
      "150ml nước dừa tươi ngọt thanh"
    ],
    instructions: [
      "Rửa cá với muối hạt và nước cốt chanh để khử sạch nhớt và mùi tanh, thấm khô bằng khăn giấy.",
      "Ướp cá và thịt ba chỉ với 2 muỗng nước mắm, đường, nước màu, hành tỏi băm và một nửa lượng tiêu trong 25 phút.",
      "Cho tộ đất lên bếp, phi thơm hành tỏi với chút dầu ăn rồi cho thịt ba chỉ vào đảo săn xém cạnh.",
      "Xếp từng khúc cá vào tộ đất, rưới phần nước ướp lên. Đun lửa lớn khoảng 5 phút cho thịt cá săn chắc lại.",
      "Đổ nước dừa tươi vào ngập xâm xấp mặt cá, đun sôi bùng, vớt bọt rồi hạ lửa thật nhỏ kho liu riu trong 25-30 phút.",
      "Khi nước kho sánh keo lại có màu cánh gián óng ả, rắc hành lá cắt khúc, tiêu đập dập và vài lát ớt hiểm lên rồi tắt bếp."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Kho trong tộ đất trên lửa nhỏ liu riu sẽ giúp thịt cá săn chắc, đậm đà và nước sốt keo sánh thơm ngon nhất."
  },

  // 02. Thịt Kho Trứng
  {
    title: "Thịt Kho Trứng",
    category: "Lunch",
    rating: 5,
    estimatedTime: 50,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Thịt", "Kho"],
    winePairing: "Trà đá sả chanh giải ngấy hoặc nước dừa tươi",
    calories: 580,
    protein: 34,
    fat: 36,
    carbs: 12,
    ingredients: [
      "600g thịt ba chỉ (hoặc thịt chân giò) cắt khối vuông 4-5cm",
      "6 quả trứng vịt (hoặc trứng gà) luộc chín, bóc vỏ",
      "400ml nước dừa xiêm tươi ngọt",
      "4 muỗng canh nước mắm truyền thống",
      "2 muỗng canh đường vàng hoặc đường phèn",
      "1 muỗng cà phê nước màu dừa",
      "Hành tím, tỏi giã nhuyễn, ớt hiểm nguyên trái",
      "1/2 muỗng cà phê tiêu xay"
    ],
    instructions: [
      "Chần thịt qua nồi nước sôi có gừng đập dập và chút muối trong 2 phút rồi vớt ra rửa sạch, để ráo.",
      "Ướp thịt với nước mắm, đường, hành tỏi giã nhuyễn, tiêu và nước màu dừa trong 30-45 phút cho thịt thấm sâu.",
      "Cho thịt vào nồi đảo đều trên lửa vừa đến khi miếng thịt săn lại và tươm mỡ trong veo.",
      "Đổ nước dừa tươi vào ngập mặt thịt, đun lửa lớn cho sôi bùng rồi vớt bọt sạch, sau đó hạ lửa nhỏ đậy nắp hé.",
      "Sau khi kho được 30 phút, nhẹ nhàng thả trứng luộc vào kho cùng để trứng ngấm gia vị và có màu nâu vàng óng.",
      "Tiếp tục đun liu riu thêm 15-20 phút đến khi nước thịt sánh vàng, thịt mềm rục tan trong miệng mà không nát, thả vài trái ớt hiểm rồi tắt bếp."
    ],
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Dùng nước dừa xiêm ngọt thanh và không đậy nắp kín hoàn toàn sẽ giúp nước kho trong vắt và thịt có màu cánh gián tự nhiên tuyệt đẹp."
  },

  // 03. Canh Chua Cá
  {
    title: "Canh Chua Cá",
    category: "Lunch",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Canh", "Hải Sản"],
    winePairing: "Nước mía tươi hoặc trà hoa cúc ướp lạnh",
    calories: 260,
    protein: 28,
    fat: 6,
    carbs: 22,
    ingredients: [
      "400g cá lóc (hoặc cá diêu hồng, cá bông lau) cắt khoanh tròn",
      "1/4 quả thơm (dứa) thái lát tam giác",
      "2 quả cà chua chín bổ múi cau",
      "5 quả đậu bắp cắt lát xéo",
      "1 cây dọc mùng (bạc hà) tước vỏ, bóp muối rửa sạch",
      "100g giá đỗ tươi",
      "50g vắt me chín chua (dầm lấy 1 bát nước cốt)",
      "Ngò ôm (rau ngổ), ngò gai (mùi tàu), ớt sừng cắt lát",
      "Gia vị: Nước mắm, đường, muối, tỏi phi vàng thơm"
    ],
    instructions: [
      "Rửa sạch cá với muối chanh khử nhớt, ướp nhẹ với 1 thìa cà phê nước mắm và tiêu trong 10 phút.",
      "Phi thơm tỏi băm trong nồi với chút dầu ăn, trút cà chua và thơm vào xào nhẹ tạo màu vàng đỏ bắt mắt.",
      "Đổ 1.2 lít nước vào đun sôi, cho nước cốt me chua vào khuấy đều.",
      "Nước sôi bùng thì thả từng khúc cá vào, đun sôi trong 7-10 phút cho cá chín ngọt nước, hớt bọt liên tục.",
      "Nêm đường, nước mắm và muối theo tỷ lệ chuẩn vị chua ngọt đậm đà hài hòa kiểu miền Tây.",
      "Thả đậu bắp, dọc mùng và giá đỗ vào đun thêm 1-2 phút cho rau vừa chín giòn ngọt tự nhiên.",
      "Múc canh ra tô lớn, rắc ngò ôm, ngò gai thái nhỏ, vài lát ớt đỏ và rắc nhiều tỏi phi thơm lừng lên trên."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Nước canh chuẩn phải có vị chua dịu từ me, ngọt thanh từ thơm và cá tươi, thơm nồng mùi ngò ôm ngò gai."
  },

  // 04. Rau Muống Xào Tỏi
  {
    title: "Rau Muống Xào Tỏi",
    category: "Lunch",
    rating: 5,
    estimatedTime: 15,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Rau/Trái Cây", "Xào"],
    winePairing: "Trà đá Hà Nội mát lạnh",
    calories: 140,
    protein: 4,
    fat: 8,
    carbs: 12,
    ingredients: [
      "1 bó rau muống non (khoảng 400g) ngắt ngọn, bỏ cọng già",
      "2 củ tỏi ta thơm (1 củ băm nhỏ, 1 củ đập dập)",
      "2 muỗng canh dầu ăn",
      "1 muỗng canh dầu hào cao cấp",
      "1 muỗng cà phê nước mắm ngon",
      "1/2 muỗng cà phê hạt nêm hoặc bột ngọt",
      "1 thau nước đá lạnh và chút muối hạt"
    ],
    instructions: [
      "Đun nồi nước sôi lớn với 1 thìa cà phê muối. Thả rau muống vào chần nhanh trong 40 giây rồi vớt ra ngâm ngay vào thau nước đá lạnh 3 phút để rau giòn sần sật và giữ màu xanh mướt.",
      "Vớt rau ra rổ thưa, vẩy nhẹ cho ráo nước hoàn toàn.",
      "Đặt chảo lớn lên bếp, cho dầu ăn và tỏi đập dập vào phi thơm vàng xém cạnh dậy mùi nức mũi.",
      "Bật lửa lớn tối đa, trút rau muống vào đảo nhanh tay liên tục.",
      "Nêm dầu hào, nước mắm và hạt nêm, đảo đều tay trong 1-2 phút cho gia vị bao đều từng cọng rau.",
      "Rắc phần tỏi băm còn lại vào đảo lần cuối rồi trút ngay ra đĩa lớn, giữ trọn độ bóng mượt và giòn ngọt."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bí quyết rau muống xào xanh giòn là chần qua nước sôi rồi ngâm nước đá, và xào trên lửa thật lớn trong thời gian ngắn."
  },

  // 05. Đậu Hũ Sốt Cà Chua
  {
    title: "Đậu Hũ Sốt Cà Chua",
    category: "Lunch",
    rating: 5,
    estimatedTime: 20,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Chay", "Đậu hũ"],
    winePairing: "Nước chanh mật ong hoặc trà tim sen thanh nhiệt",
    calories: 280,
    protein: 16,
    fat: 14,
    carbs: 18,
    ingredients: [
      "4 miếng đậu hũ trắng mềm mịn",
      "3 quả cà chua chín đỏ mọng, băm hạt lựu",
      "3 nhánh hành lá cắt nhỏ (đầu hành trắng băm riêng)",
      "2 củ hành tím băm nhỏ",
      "1 muỗng canh nước mắm ngon (hoặc nước tương)",
      "1 muỗng cà phê đường, 1/2 muỗng cà phê tiêu",
      "Dầu ăn để chiên đậu"
    ],
    instructions: [
      "Cắt đậu hũ thành các khối vuông vừa ăn, dùng khăn sạch thấm khô nước trên bề mặt.",
      "Làm nóng chảo dầu, cho đậu hũ vào chiên ở lửa vừa đến khi lớp vỏ ngoài vàng rụm giòn đều các mặt rồi vớt ra đĩa có lót giấy thấm dầu.",
      "Chắt bớt dầu trong chảo, phi thơm hành tím và đầu hành trắng băm.",
      "Cho cà chua băm vào xào cùng chút muối, dằm nhẹ cho cà chua nhuyễn mịn thành nước sốt sánh đỏ.",
      "Nêm nước mắm, đường và 3 muỗng canh nước lọc, đun sôi nhẹ rồi nhẹ nhàng thả đậu hũ chiên vào rim lửa nhỏ trong 6-8 phút cho đậu ngấm sâu vị sốt cà chua.",
      "Rắc hành lá thái nhỏ và tiêu xay thơm lên trên, tắt bếp và múc ra đĩa sâu lòng ăn kèm cơm nóng."
    ],
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Chọn cà chua chín mọng nhiều bột để sốt có màu đỏ tự nhiên và vị chua ngọt thanh dịu."
  },

  // 06. Gà Rang Gừng
  {
    title: "Gà Rang Gừng",
    category: "Lunch",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Thịt", "Gà"],
    winePairing: "Trà gừng ấm hoặc nước sâm atiso",
    calories: 420,
    protein: 38,
    fat: 22,
    carbs: 6,
    ingredients: [
      "600g thịt gà ta thả vườn (chặt miếng vừa ăn)",
      "1 củ gừng tươi cạo vỏ, thái sợi chỉ mỏng dài",
      "2 củ hành tím, 1 củ tỏi băm nhuyễn",
      "2 muỗng canh nước mắm truyền thống cốt cá cơm",
      "1 muỗng canh đường vàng",
      "1/2 muỗng cà phê bột nghệ (để tạo màu vàng óng)",
      "Vài lá chanh non thái sợi chỉ, 1 quả ớt hiểm",
      "1/2 muỗng cà phê tiêu đen xay"
    ],
    instructions: [
      "Xát thịt gà với muối hạt và gừng đập dập khử sạch mùi, chặt miếng vuông vừa ăn rồi để ráo nước.",
      "Ướp gà với nước mắm, đường, hành tỏi băm, bột nghệ, tiêu và 1/2 lượng gừng thái sợi trong 20 phút.",
      "Đặt chảo sâu lòng lên bếp, cho 1 thìa dầu ăn phi thơm phần gừng sợi còn lại đến khi dậy mùi cay nồng.",
      "Trút thịt gà vào xào đảo trên lửa lớn đến khi miếng thịt săn lại và tươm mỡ vàng ruộm bóng bẩy.",
      "Hạ lửa vừa, đậy vung lại rang liu riu cho thịt gà chín mềm từ bên trong và tiết ra nước ngọt.",
      "Mở nắp vung, tiếp tục đảo trên lửa vừa đến khi nước sốt cạn sánh lại bám đều vào từng miếng gà vàng ươm, rắc lá chanh non thái sợi và tiêu lên rồi múc ra đĩa."
    ],
    imageUrl: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Nên dùng gà ta để thịt săn chắc, da giòn sần sật. Gừng thái chỉ giòn cay hòa quyện lá chanh non tạo hương vị ấm cúng đặc trưng."
  },

  // 07. Thịt Rang Mắm Ruốc
  {
    title: "Thịt Rang Mắm Ruốc",
    category: "Lunch",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Thịt", "Kho"],
    winePairing: "Trà đá đậm hoặc nước chanh tươi",
    calories: 510,
    protein: 29,
    fat: 38,
    carbs: 8,
    ingredients: [
      "500g thịt ba chỉ nhiều nạc, thái con chì dày 1cm",
      "3 muỗng canh mắm ruốc Huế thơm ngon",
      "4 cây sả tươi băm thật nhuyễn",
      "2 quả ớt hiểm và 1 quả ớt sừng băm nhỏ",
      "1 củ tỏi, 2 củ hành tím băm nhỏ",
      "2 muỗng canh đường cát vàng (để dịu vị đậm của mắm ruốc)",
      "1 muỗng cà phê tiêu xay"
    ],
    instructions: [
      "Hòa mắm ruốc với 3 muỗng canh nước ấm, khuấy tan rồi để lắng cặn trong 10 phút, gạn lấy phần nước cốt trong bên trên.",
      "Cho thịt ba chỉ vào chảo không dầu, đảo đều tay ở lửa vừa cho thịt tươm mỡ và xém cạnh vàng giòn.",
      "Trút thịt ra đĩa riêng, múc bớt mỡ thừa trong chảo ra, chỉ để lại khoảng 1 muỗng canh.",
      "Phi thơm hành tỏi băm cùng sả và ớt băm nhuyễn đến khi sả vàng giòn và tỏa hương thơm nức.",
      "Cho thịt ba chỉ đã rán xém cạnh vào chảo đảo đều cùng sả ớt, sau đó đổ chén nước cốt mắm ruốc vào.",
      "Nêm đường vừa ăn, hạ lửa nhỏ liu riu đảo liên tục đến khi mắm ruốc cô đặc lại, bám một lớp nâu óng cay mặn ngọt đậm đà quanh từng miếng thịt ba chỉ."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Món ăn cực kỳ đưa cơm trong bữa trưa gia đình, ăn kèm dưa leo giòn rụm hoặc rau sống thì ngon tuyệt đỉnh."
  },

  // 08. Canh Bầu Nấu Tôm
  {
    title: "Canh Bầu Nấu Tôm",
    category: "Lunch",
    rating: 5,
    estimatedTime: 20,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Canh", "Hải Sản"],
    winePairing: "Nước đậu đen rang hoặc trà atiso thanh mát",
    calories: 170,
    protein: 18,
    fat: 3,
    carbs: 16,
    ingredients: [
      "1 quả bầu non tươi (khoảng 500g) gọt vỏ, băm vạt hoặc thái sợi",
      "200g tôm sú tươi bóc vỏ, rút chỉ đen, giã dập",
      "2 củ hành tím băm nhỏ",
      "3 nhánh hành lá, 1 mớ ngò rí (rau mùi) thái nhỏ",
      "1 muỗng canh nước mắm truyền thống",
      "1/2 muỗng cà phê tiêu sọ xay, chút muối, 1 thìa dầu ăn"
    ],
    instructions: [
      "Tôm bóc vỏ giã dập, ướp với chút đầu hành trắng, 1/2 muỗng cà phê nước mắm và tiêu trong 10 phút.",
      "Bầu non gọt vỏ, rửa sạch rồi băm xung quanh thái vát hoặc cắt khúc vừa ăn.",
      "Phi thơm hành tím với 1 thìa dầu ăn trong nồi, cho tôm vào xào nhanh 1 phút cho thịt tôm săn hồng thơm lừng.",
      "Đổ 800ml nước lọc vào nồi, đun sôi bùng và vớt sạch bọt cho nước canh trong veo thanh ngọt.",
      "Thả bầu vào nồi, đun sôi trở lại khoảng 2 phút đến khi miếng bầu chuyển sang màu trong là vừa chín tới, giữ được độ giòn ngọt tự nhiên.",
      "Nêm nước mắm và chút muối vừa miệng, rắc hành ngò thái nhỏ và tiêu xay thơm nồng rồi múc ra tô thưởng thức."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "'Râu tôm nấu với ruột bầu, chồng chan vợ húp gật đầu khen ngon' - Món canh dân dã giải nhiệt tuyệt vời cho ngày hè oi bức."
  },

  // 09. Cá Chiên Sốt Mắm Tỏi Ớt
  {
    title: "Cá Chiên Sốt Mắm Tỏi Ớt",
    category: "Lunch",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Hải Sản", "Chiên"],
    winePairing: "Bia tươi hoặc trà chanh đá chua ngọt",
    calories: 430,
    protein: 35,
    fat: 22,
    carbs: 14,
    ingredients: [
      "1 con cá diêu hồng (hoặc cá chim, cá rô phi khoảng 800g) làm sạch",
      "1 củ tỏi ta băm nhuyễn",
      "3 quả ớt sừng và ớt hiểm đỏ băm nhuyễn",
      "3 muỗng canh nước mắm cốt cá cơm",
      "2.5 muỗng canh đường vàng",
      "1 muỗng canh nước cốt chanh tươi",
      "2 muỗng canh nước ấm",
      "Dầu ăn ngập chảo để chiên cá giòn"
    ],
    instructions: [
      "Khía vài đường chéo trên thân cá, rửa sạch với nước muối pha chanh rồi dùng khăn sạch thấm thật khô ráo hai mặt cá.",
      "Đun dầu sôi già trong chảo sâu lòng, hạ lửa vừa rồi thả cá vào chiên ngập dầu đến khi lớp da ngoài vàng giòn rụm và thịt cá chín ngọt, vớt ra đĩa có lót giấy thấm dầu.",
      "Pha sốt mắm tỏi ớt: Khuấy tan nước mắm, đường, nước cốt chanh và nước ấm cho vị mặn ngọt chua hài hòa, sau đó cho tỏi và ớt băm vào nổi đều lên trên.",
      "Bắc chảo nhỏ lên bếp, đun sôi nhẹ chén sốt mắm tỏi ớt cho nước sốt hơi sánh lại dậy mùi thơm nức.",
      "Rưới đều lớp nước sốt mắm tỏi ớt bóng láng lên thân cá chiên giòn hoặc để riêng làm chén nước chấm đậm đà ăn kèm dưa leo, rau thơm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Thấm khô cá trước khi chiên giúp da cá giòn rụm và không bị bắn dầu. Tỏi ớt nổi lên trên mặt nước sốt nhìn vô cùng bắt mắt."
  },

  // 10. Sườn Xào Chua Ngọt
  {
    title: "Sườn Xào Chua Ngọt",
    category: "Lunch",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Thịt", "Xào"],
    winePairing: "Nước cam vắt tươi hoặc soda chanh",
    calories: 490,
    protein: 28,
    fat: 26,
    carbs: 32,
    ingredients: [
      "500g sườn non heo chặt khúc dài 3-4cm",
      "1/4 quả thơm (dứa) chín thái lát tam giác",
      "1/2 quả ớt chuông đỏ, 1/2 củ hành tây thái miếng vuông",
      "Tỏi, hành tím băm nhuyễn, hành lá cắt khúc",
      "Nước sốt chua ngọt: 2 muỗng canh giấm gạo (hoặc nước cốt me), 2 muỗng canh đường, 2 muỗng canh nước mắm, 2 muỗng tương cà ketchup",
      "1 thìa bột năng hòa chút nước",
      "Dầu ăn để chiên sườn"
    ],
    instructions: [
      "Chần sườn qua nồi nước sôi có vài lát gừng và muối trong 2 phút rồi vớt ra rửa sạch, để ráo nước.",
      "Ướp sườn với chút hành tỏi băm, hạt nêm và tiêu trong 15 phút.",
      "Cho sườn vào chảo chiên lửa vừa cho hai mặt vàng xém thơm giòn rồi vớt ra đĩa.",
      "Hòa tan hỗn hợp nước sốt chua ngọt (giấm, đường, nước mắm, tương cà).",
      "Phi thơm tỏi băm trong chảo, đổ bát nước sốt vào đun sôi lăn tăn, trút sườn chiên vào đảo đều, hạ lửa nhỏ rim 10 phút cho sườn ngấm sâu gia vị.",
      "Cho thơm, ớt chuông và hành tây vào đảo nhanh 3 phút cho chín tới giòn ngọt, rưới chút nước bột năng cho nước sốt sánh bóng bám đều quanh từng miếng sườn, rắc hành lá rồi tắt bếp."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Nước sốt sánh đỏ óng ánh, vị chua ngọt thanh nhẹ từ dứa và giấm gạo quyện cùng sườn mềm thơm béo ngậy."
  },

  // 11. Trứng Chiên Thịt Bằm
  {
    title: "Trứng Chiên Thịt Bằm",
    category: "Lunch",
    rating: 5,
    estimatedTime: 15,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Trứng", "Chiên"],
    winePairing: "Trà xanh ướp hoa nhài hoặc nước rau má mát lành",
    calories: 320,
    protein: 22,
    fat: 24,
    carbs: 4,
    ingredients: [
      "4 quả trứng gà ta tươi",
      "150g thịt nạc vai heo băm nhuyễn",
      "2 củ hành tím băm nhỏ",
      "3 nhánh hành lá thái nhỏ",
      "1 muỗng canh nước mắm ngon cốt cá cơm",
      "1/2 muỗng cà phê hạt nêm, 1/2 muỗng cà phê tiêu xay",
      "2 muỗng canh dầu ăn"
    ],
    instructions: [
      "Cho thịt băm vào tô ướp cùng hành tím băm, 1 thìa cà phê nước mắm, hạt nêm và tiêu trong 5 phút.",
      "Đập 4 quả trứng gà vào tô thịt băm, thêm hành lá cắt nhỏ rồi dùng đũa đánh tan đều cho thịt tơi xốp hòa quyện với trứng.",
      "Đun nóng chảo với 2 muỗng canh dầu ăn, láng đều khắp mặt chảo.",
      "Hạ lửa vừa, đổ hỗn hợp trứng thịt vào chảo, lắc nhẹ chảo cho trứng dàn mỏng đều thành hình tròn đẹp mắt.",
      "Đậy nắp chảo trong 3 phút để phần thịt bên trong chín mềm và phồng xốp thơm ngon.",
      "Khi mặt dưới vàng ruộm, khéo léo lật mặt trứng chiên tiếp 2 phút đến khi hai mặt vàng óng thơm phức, cho ra đĩa cắt miếng tam giác vừa ăn."
    ],
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Món ăn siêu nhanh gọn, mềm béo thơm ngậy mùi hành tiêu, các bạn nhỏ và cả gia đình đều mê tít."
  },

  // 12. Canh Rau Ngót Thịt Bằm
  {
    title: "Canh Rau Ngót Thịt Bằm",
    category: "Lunch",
    rating: 5,
    estimatedTime: 15,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Canh", "Thịt"],
    winePairing: "Nước chanh đường hoặc nước đậu xanh mát lành",
    calories: 160,
    protein: 17,
    fat: 5,
    carbs: 12,
    ingredients: [
      "2 bó rau ngót tươi non (tuốt lấy lá, rửa sạch và vò nhẹ)",
      "150g thịt nạc vai heo băm nhỏ",
      "2 củ hành tím băm nhỏ",
      "1 muỗng canh nước mắm truyền thống",
      "1/2 muỗng cà phê muối, 1/2 muỗng cà phê tiêu xay",
      "1 muỗng cà phê dầu ăn"
    ],
    instructions: [
      "Rau ngót tuốt lấy lá non, rửa sạch qua 2-3 lần nước rồi dùng hai bàn tay vò nhẹ cho lá hơi dập (giúp rau khi nấu mềm và ngọt nước).",
      "Ướp thịt băm với chút hành tím băm, 1 thìa cà phê nước mắm và tiêu trong 5 phút.",
      "Đặt nồi lên bếp, phi thơm hành tím với 1 thìa cà phê dầu ăn rồi cho thịt băm vào xào săn tơi.",
      "Đổ 800ml nước lọc vào nồi đun sôi bùng, dùng muôi hớt sạch bọt cho nước canh trong veo.",
      "Thả rau ngót đã vò vào nồi, đun lửa lớn trong 3-4 phút đến khi rau vừa chín mềm xanh mướt.",
      "Nêm nước mắm và chút muối vừa miệng rồi tắt bếp, múc canh ra tô dùng nóng thanh nhiệt cơ thể."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Rau ngót giàu vitamin và khoáng chất, vị ngọt mát tự nhiên của rau hòa cùng thịt băm thanh lành."
  },

  // 13. Bò Xào Rau Củ
  {
    title: "Bò Xào Rau Củ",
    category: "Lunch",
    rating: 5,
    estimatedTime: 25,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Thịt", "Xào"],
    winePairing: "Trà mạn sen ấm hoặc nước sâm bông cúc",
    calories: 360,
    protein: 32,
    fat: 14,
    carbs: 24,
    ingredients: [
      "300g thịt bò thăn mềm thái lát mỏng ngang thớ",
      "1 cây súp lơ xanh (bông cải) tách nhánh nhỏ",
      "1 củ cà rốt tỉa hoa thái lát mỏng",
      "1/2 quả ớt chuông đỏ thái miếng vừa ăn",
      "1/2 củ hành tây thái múi cau",
      "3 tép tỏi băm nhuyễn, 1 muỗng canh dầu hào",
      "1 muỗng canh xì dầu (nước tương), tiêu xay, dầu ăn"
    ],
    instructions: [
      "Ướp thịt bò với tỏi băm, 1 muỗng canh dầu hào, 1/2 muỗng cà phê tiêu và 1 thìa dầu ăn trong 15 phút để thịt mềm mọng.",
      "Chần sơ bông cải xanh và cà rốt qua nước sôi có chút muối trong 1 phút rồi vớt ngâm ngay vào âu nước đá để rau giòn và giữ màu sắc tươi tắn.",
      "Làm nóng chảo lớn với dầu ăn, bật lửa to, trút thịt bò vào xào nhanh tay trong 1.5 - 2 phút cho thịt vừa chín tới thì trút riêng ra đĩa.",
      "Dùng lại chảo, thêm chút dầu phi thơm tỏi băm rồi cho cà rốt, bông cải xanh, ớt chuông và hành tây vào đảo đều tay.",
      "Nêm dầu hào và xì dầu vừa ăn, xào 3 phút cho rau củ chín giòn ngọt tự nhiên.",
      "Trút đĩa thịt bò trở lại chảo đảo nhanh tay 30 giây cho hòa quyện hương vị, rắc tiêu xay thơm lừng rồi tắt bếp trút ra đĩa."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Xào thịt bò trên lửa lớn thật nhanh để thịt mềm ngọt không bị dai, rau củ vừa chín tới giòn ngọt nhiều màu sắc."
  },

  // 14. Tôm Rim Mặn Ngọt
  {
    title: "Tôm Rim Mặn Ngọt",
    category: "Lunch",
    rating: 5,
    estimatedTime: 20,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Hải Sản", "Kho"],
    winePairing: "Nước mía tươi hoặc nước dừa xiêm ngọt thanh",
    calories: 310,
    protein: 28,
    fat: 10,
    carbs: 16,
    ingredients: [
      "400g tôm sú hoặc tôm đất tươi (cắt bớt râu, rửa sạch để nguyên vỏ cho giòn)",
      "1 củ tỏi, 2 củ hành tím băm nhuyễn",
      "2 nhánh hành lá thái nhỏ",
      "2 muỗng canh nước mắm cốt cá cơm",
      "1.5 muỗng canh đường vàng",
      "1/2 muỗng cà phê nước màu dừa",
      "1/2 muỗng cà phê tiêu sọ xay",
      "1 muỗng canh dầu ăn"
    ],
    instructions: [
      "Tôm cắt bớt phần râu dài và gai nhọn ở đầu, rửa sạch rồi để thật ráo nước.",
      "Làm nóng 1 muỗng canh dầu ăn trong chảo, cho tôm vào đảo đều trên lửa lớn đến khi vỏ tôm chuyển sang màu đỏ au và săn giòn thì gắp ra đĩa.",
      "Pha nước sốt rim: Hòa tan nước mắm, đường, nước màu dừa, tiêu xay và 2 muỗng canh nước lọc.",
      "Phi thơm hành tỏi băm trong chảo, đổ chén nước sốt rim vào đun sôi liu riu tạo bọt mịn sánh.",
      "Trút tôm vào đảo đều tay trên lửa vừa cho nước sốt ngấm sâu bám chặt vào từng con tôm.",
      "Rim nhỏ lửa đến khi nước sốt cạn sánh kẹo bóng mượt bọc quanh lớp vỏ tôm giòn ngọt, rắc hành lá thái nhỏ và tiêu rồi tắt bếp."
    ],
    imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Để nguyên vỏ tôm khi rim giúp vỏ giòn rụm, thịt tôm bên trong ngọt đượm gia vị mặn ngọt óng ánh."
  },

  // 15. Canh Bí Đỏ Nấu Xương
  {
    title: "Canh Bí Đỏ Nấu Xương",
    category: "Lunch",
    rating: 5,
    estimatedTime: 40,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Canh", "Thịt"],
    winePairing: "Trà tim sen ấm hoặc nước sâm thanh mát",
    calories: 320,
    protein: 24,
    fat: 16,
    carbs: 22,
    ingredients: [
      "400g xương heo (sườn non hoặc xương đuôi) chặt khúc vừa ăn",
      "400g bí đỏ chín vàng gọt vỏ, cắt khối vuông dày",
      "2 củ hành tím đập dập",
      "Hành lá, ngò gai (mùi tàu) thái nhỏ",
      "1 muỗng canh nước mắm cốt",
      "Muối hạt, tiêu xay"
    ],
    instructions: [
      "Chần xương heo qua nồi nước sôi trong 2 phút rồi rửa sạch bọt bẩn dưới vòi nước lạnh.",
      "Cho xương vào nồi cùng 1.2 lít nước và hành tím đập dập, đun sôi bùng rồi hạ lửa nhỏ hầm trong 25 phút cho xương ra nước ngọt tự nhiên, thường xuyên hớt bọt.",
      "Thả bí đỏ vào nồi hầm cùng xương trong 10-12 phút đến khi bí chín bùi mềm dẻo mà không bị nát vụn.",
      "Nêm nước mắm và chút muối vừa vị ngọt bùi béo tự nhiên.",
      "Múc canh ra tô lớn, rắc hành lá, ngò gai thái nhỏ và chút tiêu xay thơm lừng lên trên dùng nóng với cơm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bí đỏ ngọt bùi tự nhiên kết hợp nước hầm xương đậm đà bổ dưỡng, cực kỳ tốt cho sức khỏe và giấc ngủ."
  },

  // 16. Thịt Kho Tiêu
  {
    title: "Thịt Kho Tiêu",
    category: "Lunch",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Thịt", "Kho"],
    winePairing: "Trà xanh đá mát lạnh hoặc nước vối ấm",
    calories: 520,
    protein: 30,
    fat: 38,
    carbs: 8,
    ingredients: [
      "500g thịt ba chỉ (hoặc thịt nạc dăm có vân mỡ) thái miếng dày 1.5cm",
      "1.5 muỗng canh hạt tiêu đen đập dập (tiêu Phú Quốc thơm cay nồng)",
      "3 muỗng canh nước mắm cốt cá cơm",
      "1.5 muỗng canh đường vàng",
      "1 muỗng cà phê nước màu dừa",
      "3 củ hành tím, 1 củ tỏi băm nhuyễn",
      "2 nhánh hành lá, 1 quả ớt hiểm"
    ],
    instructions: [
      "Thịt rửa sạch, thái miếng vừa ăn dày khoảng 1.5cm, để ráo nước.",
      "Ướp thịt với 2 muỗng nước mắm, đường, nước màu, hành tỏi băm và một nửa lượng tiêu đen đập dập trong 20 phút.",
      "Đặt nồi lên bếp, đảo đều thịt trên lửa vừa đến khi miếng thịt săn lại và tươm mỡ thơm ngậy.",
      "Thêm khoảng 100ml nước lọc ấm xâm xấp mặt thịt, đun sôi rồi hạ lửa thật nhỏ kho liu riu.",
      "Đun khoảng 20 phút đến khi nước thịt cạn keo lại, áo đều một lớp màu nâu cánh gián bóng loáng thơm lừng.",
      "Rắc phần tiêu đập dập còn lại cùng hành lá cắt nhỏ và ớt hiểm vào, đảo đều tay 30 giây rồi tắt bếp ăn nóng với cơm dẻo."
    ],
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Kho tiêu chuẩn là nước kho phải keo sệt sánh đặc, vị cay nồng đượm đà của tiêu sọ kết hợp thịt béo ngậy."
  },

  // 17. Cá Hấp Xì Dầu
  {
    title: "Cá Hấp Xì Dầu",
    category: "Lunch",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Hải Sản", "Hấp"],
    winePairing: "Trà ô long hoặc nước sâm mía lau thanh dịu",
    calories: 340,
    protein: 36,
    fat: 12,
    carbs: 14,
    ingredients: [
      "1 con cá chẽm (hoặc cá diêu hồng, cá mú tươi khoảng 800g - 1kg)",
      "1 củ gừng tươi cạo vỏ, thái chỉ dài mỏng",
      "1 bó hành lá (phần cọng trắng chẻ sợi, lá cắt khúc)",
      "1 củ hành tây thái mỏng, 1 quả ớt sừng thái sợi",
      "Nước sốt xì dầu: 3 muỗng canh xì dầu (nước tương ngon), 1 muỗng canh dầu hào, 1 muỗng canh dầu mè thơm, 1 muỗng canh đường, 3 muỗng nước dùng gà hoặc nước lọc",
      "2 muỗng canh dầu ăn đun sôi già"
    ],
    instructions: [
      "Làm sạch cá, khía vài đường xéo trên thân cá rồi thoa chút rượu trắng và gừng đập dập để khử sạch mùi tanh.",
      "Nhét vài lát gừng và cọng hành vào bụng cá, đặt cá lên đĩa sâu lòng chịu nhiệt.",
      "Đặt đĩa cá vào xửng hấp trong 15-18 phút đến khi cá vừa chín tới, chắt bỏ phần nước đọng tanh trong đĩa cá.",
      "Khuấy đều hỗn hợp nước sốt xì dầu rồi đun sôi lăn tăn trong chảo nhỏ.",
      "Rải gừng thái chỉ, hành lá chẻ sợi, hành tây và ớt sừng lên phủ kín lưng cá.",
      "Rưới phần nước sốt xì dầu nóng hổi lên khắp mình cá.",
      "Đun sôi 2 muỗng canh dầu ăn cho thật nóng già rồi dội trực tiếp lên lớp hành gừng để kích hương thơm bùng nổ ngọt ngào."
    ],
    imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Bước dội dầu ăn sôi già lên hành gừng là bí quyết chuẩn nhà hàng giúp dậy mùi thơm lừng quyến rũ khó cưỡng."
  },

  // 18. Canh Cải Nấu Thịt
  {
    title: "Canh Cải Nấu Thịt",
    category: "Lunch",
    rating: 5,
    estimatedTime: 20,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Canh", "Thịt"],
    winePairing: "Trà hoa cúc hoặc nước chanh mật ong ấm",
    calories: 150,
    protein: 16,
    fat: 5,
    carbs: 10,
    ingredients: [
      "1 bó rau cải ngọt hoặc cải thìa (400g) rửa sạch cắt khúc 3-4cm",
      "150g thịt nạc heo băm nhuyễn",
      "1 nhánh gừng tươi nhỏ đập dập (bí quyết canh cải ấm bụng, dậy mùi)",
      "2 củ hành tím băm nhỏ",
      "1 muỗng canh nước mắm truyền thống",
      "Muối, tiêu xay, 1 thìa dầu ăn"
    ],
    instructions: [
      "Rau cải nhặt sạch lá sâu, ngâm nước muối loãng 5 phút rồi rửa sạch lại, để ráo.",
      "Ướp thịt băm với chút hành tím băm, nước mắm và hạt tiêu trong 10 phút.",
      "Phi thơm hành tím trong nồi với 1 thìa dầu ăn, cho thịt băm vào xào săn thơm.",
      "Đổ 800ml nước vào nồi cùng vài lát gừng đập dập, đun sôi bùng và hớt bọt cho nước canh trong veo.",
      "Thả rau cải vào nồi, đun lửa lớn trong 2-3 phút cho cải vừa chín tới giữ màu xanh mướt và độ giòn ngọt.",
      "Nêm nước mắm và chút muối vừa ăn rồi tắt bếp, múc ra tô thưởng thức vị ngọt thanh ấm nồng."
    ],
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Vài lát gừng tươi đập dập giúp cân bằng tính hàn của rau cải, làm bát canh thơm nồng ấm bụng."
  },

  // 19. Mực Xào Cần Tây
  {
    title: "Mực Xào Cần Tây",
    category: "Lunch",
    rating: 5,
    estimatedTime: 20,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Hải Sản", "Xào"],
    winePairing: "Bia lạnh hoặc trà chanh đá sảng khoái",
    calories: 260,
    protein: 30,
    fat: 7,
    carbs: 16,
    ingredients: [
      "400g mực ống tươi hoặc mực lá (làm sạch, khía vảy rồng cắt miếng vừa ăn)",
      "2 cây cần tây rửa sạch cắt khúc",
      "1 củ hành tây bổ múi cau",
      "1 quả cà chua chín bổ múi cau, 1/2 củ cà rốt thái lát",
      "3 tép tỏi băm nhuyễn, 1 củ hành tím",
      "1 muỗng canh dầu hào, 1 muỗng cà phê nước mắm, tiêu xay, dầu ăn"
    ],
    instructions: [
      "Khía vảy rồng trên thân mực, chần nhanh mực qua nồi nước sôi có rượu trắng và gừng đập dập trong 30 giây rồi vớt ngâm ngay vào nước đá cho mực giòn sần sật và không chảy nước khi xào.",
      "Ướp mực với chút tỏi băm, dầu hào và tiêu trong 10 phút.",
      "Làm nóng chảo lớn với dầu ăn, phi thơm tỏi băm rồi trút mực vào xào lửa lớn trong 1.5 phút cho mực săn giòn thì trút riêng ra đĩa.",
      "Cho tiếp cần tây, hành tây, cà rốt và cà chua vào chảo đảo nhanh tay trên lửa lớn trong 2 phút.",
      "Trút mực trở lại chảo đảo đều cùng rau củ, nêm chút nước mắm và dầu hào cho vừa miệng.",
      "Rắc thật nhiều tiêu xay thơm cay nồng rồi tắt bếp, trút ra đĩa thưởng thức giòn ngọt nóng hổi."
    ],
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Chần sơ mực qua nước sôi có gừng rượu và xào trên lửa lớn giúp miếng mực giòn sần sật, không hề bị dai hay ra nước."
  },

  // 20. Rau Củ Luộc Kho Quẹt
  {
    title: "Rau Củ Luộc Kho Quẹt",
    category: "Lunch",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Lunch", "Cơm Nhà", "Rau/Trái Cây", "Kho"],
    winePairing: "Trà đá hoa lài mát lạnh hoặc nước dừa xiêm",
    calories: 360,
    protein: 16,
    fat: 22,
    carbs: 26,
    ingredients: [
      "Rau củ thập cẩm: 1/2 cái bắp cải, 1 củ cà rốt, 100g đậu bắp, 100g đậu que, 1/2 bông cải trắng, 1 quả bầu non",
      "150g mỡ heo (thịt mỡ ba chỉ) thái hạt lựu làm tóp mỡ giòn rụm",
      "50g tôm khô loại nhỏ ngâm nước ấm cho mềm",
      "4 muỗng canh nước mắm ngon cốt cá cơm",
      "3 muỗng canh đường vàng hoặc đường thốt nốt",
      "2 muỗng canh nước lọc",
      "3 củ hành tím, 1 củ tỏi băm nhỏ, vài quả ớt hiểm đỏ, tiêu xanh hoặc tiêu sọ đập dập"
    ],
    instructions: [
      "Thái mỡ heo hạt lựu, cho vào chảo rán trên lửa vừa cho chảy hết mỡ, thu được phần tóp mỡ vàng giòn rụm thì vớt ra để ráo dầu.",
      "Gọt vỏ và cắt rau củ thành các thanh dài vừa ăn. Đun nồi nước sôi lớn với chút muối, luộc lần lượt từng loại rau củ vừa chín tới rồi vớt ngâm ngay vào âu nước đá lạnh để giữ màu tươi tắn và độ giòn ngọt.",
      "Làm kho quẹt: Hòa tan nước mắm, đường và nước lọc trong bát.",
      "Phi thơm hành tỏi băm với 1 muỗng mỡ heo trong tộ đất, cho tôm khô đã ngâm mềm vào xào thơm săn lại.",
      "Đổ chén nước mắm đường vào tộ đất, đun sôi rồi hạ lửa nhỏ liu riu 10-15 phút đến khi sốt keo đặc sánh màu nâu cánh gián bóng láng.",
      "Cho tóp mỡ giòn, tiêu đập dập, chùm tiêu xanh và vài quả ớt hiểm vào đun thêm 2 phút cho ngấm vị rồi tắt bếp.",
      "Bày đĩa rau củ luộc ngũ sắc quanh tộ kho quẹt nóng hổi thơm nức, chấm từng thanh rau củ giòn ngọt vào kho quẹt béo ngậy mặn ngọt cực kỳ hao cơm."
    ],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isStock: true,
    notes: "Tóp mỡ giòn rụm béo ngậy, tôm khô dai ngọt hòa cùng sốt kho quẹt đậm đà chấm cùng đĩa rau củ ngũ sắc tươi giòn."
  }
];

export const NEW_LUNCH_20_TRANSLATIONS: Record<string, { en: { title: string; ingredients: string[]; instructions: string[]; winePairing?: string }, zh: { title: string; ingredients: string[]; instructions: string[]; winePairing?: string } }> = {
  "Cá Kho Tộ": {
    en: {
      title: "Caramelized Fish in Clay Pot",
      ingredients: [
        "500g fish steaks (snakehead or catfish, cut thick)",
        "150g pork belly (cut into thick strips)",
        "3 tbsp fish sauce",
        "2 tbsp palm sugar or brown sugar",
        "1 tsp caramel sauce (nuoc mau)",
        "1 tbsp crushed black & green peppercorns",
        "3 shallots, 1 head garlic (minced)",
        "2 red bird's eye chilies, scallions cut in sections",
        "150ml fresh coconut water"
      ],
      instructions: [
        "Clean fish steaks thoroughly with salt and lime, pat dry.",
        "Marinate fish and pork belly with fish sauce, sugar, caramel sauce, garlic, shallots, and crushed pepper for 25 minutes.",
        "In a clay pot, sauté shallots and garlic with a little oil, then sear pork belly until golden.",
        "Arrange fish steaks over pork belly, pour marinade over, and sear over high heat for 5 minutes.",
        "Pour fresh coconut water to barely cover fish, bring to boil, skim foam, then simmer on low heat for 25-30 minutes.",
        "When sauce is thick, glossy amber, garnish with scallions, crushed pepper, and fresh chili."
      ],
      winePairing: "Warm jasmine green tea"
    },
    zh: {
      title: "瓦煲越式红烧鱼",
      ingredients: [
        "500g 鲜鱼段（黑鱼或巴沙鱼厚切）",
        "150g 五花肉（切条）",
        "3大勺优质纯鱼露",
        "2大勺棕榈糖或黄糖",
        "1小勺焦糖色水",
        "1大勺碎胡椒粒与青花椒",
        "3个红葱头、1头大蒜（切碎）",
        "2个红小辣椒、葱段",
        "150ml 鲜椰子水"
      ],
      instructions: [
        "鱼块用盐和青柠洗净去腥，用厨房纸吸干水分。",
        "鱼与五花肉加入鱼露、糖、焦糖水、葱蒜末和胡椒腌制25分钟。",
        "瓦煲热油爆香葱蒜，下五花肉煎炒出油脂微焦。",
        "放入鱼块，淋入腌汁大火烧5分钟定型。",
        "倒入鲜椰子水没过鱼块，煮沸撇沫后转小火慢炖25-30分钟。",
        "待汤汁浓郁发亮呈琥珀色时，撒入葱段、碎胡椒和辣椒即可出锅。"
      ],
      winePairing: "温茉莉绿茶"
    }
  },

  "Thịt Kho Trứng": {
    en: {
      title: "Caramelized Pork Belly with Eggs",
      ingredients: [
        "600g pork belly cut into 4cm cubes",
        "6 hard-boiled duck or chicken eggs (peeled)",
        "400ml fresh sweet coconut water",
        "4 tbsp fish sauce",
        "2 tbsp brown sugar or rock sugar",
        "1 tsp caramel sauce",
        "Shallots, crushed garlic, whole chili peppers",
        "1/2 tsp ground black pepper"
      ],
      instructions: [
        "Blanch pork belly in boiling water with ginger and salt for 2 minutes, rinse and drain.",
        "Marinate pork with fish sauce, sugar, crushed shallots, garlic, pepper, and caramel sauce for 30 minutes.",
        "Stir-fry pork in a pot over medium heat until seared and translucent fat renders.",
        "Pour fresh coconut water to cover pork, bring to a boil, skim foam, then lower heat to a gentle simmer.",
        "After 30 minutes, gently add boiled eggs so they absorb the savory sauce and turn golden.",
        "Simmer for another 20 minutes until pork is melt-in-mouth tender and sauce turns amber, add whole chilies."
      ],
      winePairing: "Lemongrass iced tea"
    },
    zh: {
      title: "越式椰汁卤肉煨蛋",
      ingredients: [
        "600g 五花肉（切大方块）",
        "6个熟鸭蛋或鸡蛋（剥壳）",
        "400ml 鲜椰子汁",
        "4大勺传统鱼露",
        "2大勺黄糖或冰糖",
        "1小勺焦糖色水",
        "红葱头、蒜蓉、整粒小辣椒",
        "1/2小勺黑胡椒粉"
      ],
      instructions: [
        "五花肉在姜盐开水焯烫2分钟，捞出洗净沥干。",
        "用鱼露、糖、葱蒜末、胡椒和焦糖水腌制30分钟。",
        "入锅翻炒至五花肉表面收紧、油脂微出。",
        "倒入鲜椰汁没过肉块，大火烧开撇沫后转小火慢炖。",
        "炖30分钟后轻放入水煮蛋，继续小火煨煮入味上色。",
        "炖至五花肉软糯入口即化、酱汁浓郁发亮，投入整粒辣椒出锅。"
      ],
      winePairing: "香茅冰茶"
    }
  },

  "Canh Chua Cá": {
    en: {
      title: "Southern Vietnamese Sour Fish Soup",
      ingredients: [
        "400g fish steaks (snakehead or salmon)",
        "1/4 pineapple sliced into triangles",
        "2 ripe tomatoes cut into wedges",
        "5 okras diagonally sliced",
        "1 elephant ear stalk (taro stem), peeled and squeezed with salt",
        "100g fresh bean sprouts",
        "50g ripe tamarind pulp (strained with warm water)",
        "Rice paddy herb (ngo om), culantro (ngo gai), sliced chili",
        "Seasoning: Fish sauce, sugar, salt, golden fried garlic"
      ],
      instructions: [
        "Rinse fish steaks and marinate with a splash of fish sauce and pepper for 10 minutes.",
        "Sauté tomatoes and pineapple in a pot with fried garlic oil to release vibrant red and golden color.",
        "Pour in 1.2 liters of water, bring to boil, and stir in strained tamarind juice.",
        "Add fish steaks, simmer 7-10 minutes until cooked through, skimming foam.",
        "Season with sugar, fish sauce, and salt for the signature sweet-and-sour Southern balance.",
        "Add okra, elephant ear stems, and bean sprouts; cook for 1-2 minutes until tender-crisp.",
        "Ladle into large bowls, top with fresh rice paddy herbs, culantro, chili slices, and crispy fried garlic."
      ],
      winePairing: "Fresh sugarcane juice or chilled chrysanthemum tea"
    },
    zh: {
      title: "南越经典罗望子酸汤鱼",
      ingredients: [
        "400g 鲜鱼段（黑鱼或三文鱼）",
        "1/4个菠萝（切三角厚片）",
        "2个熟透西红柿（切角）",
        "5根秋葵（斜切片）",
        "1根象耳芋梗（去皮盐水揉洗）",
        "100g 鲜绿豆芽",
        "50g 熟酸角膏（温水调开取汁）",
        "水八角香草、刺芹、辣椒圈",
        "调料：鱼露、糖、盐、金黄炸蒜蓉"
      ],
      instructions: [
        "鱼块洗净用少许鱼露和胡椒腌制10分钟。",
        "热锅蒜油轻炒西红柿和菠萝炒出红黄色泽。",
        "注入1.2升水烧沸，倒入酸角汁调匀。",
        "下入鱼段沸水煮7-10分钟至肉质熟嫩，期间撇沫。",
        "以糖、鱼露和盐调出地道酸甜浓郁风味。",
        "放入秋葵、芋梗和绿豆芽，滚煮1-2分钟保持爽脆。",
        "盛入大碗，撒上香草碎、辣椒圈和金黄炸蒜即可。"
      ],
      winePairing: "鲜榨甘蔗汁"
    }
  },

  "Rau Muống Xào Tỏi": {
    en: {
      title: "Stir-fried Water Spinach with Garlic",
      ingredients: [
        "400g fresh tender morning glory / water spinach",
        "2 heads garlic (1 minced, 1 crushed whole cloves)",
        "2 tbsp cooking oil",
        "1 tbsp premium oyster sauce",
        "1 tsp fish sauce",
        "Ice water bath and salt"
      ],
      instructions: [
        "Blanch water spinach in salted boiling water for 40 seconds, then immediately submerge in ice water for 3 minutes to keep crisp and bright green.",
        "Drain thoroughly in a colander.",
        "Heat wok until smoking hot with oil, fry crushed garlic until fragrant and golden.",
        "Turn heat to maximum, toss in water spinach and stir-fry rapidly.",
        "Season with oyster sauce and fish sauce, toss for 1-2 minutes.",
        "Add remaining minced garlic, toss once more, and plate immediately."
      ],
      winePairing: "Traditional Hanoi iced green tea"
    },
    zh: {
      title: "蒜蓉爆炒爽脆空心菜",
      ingredients: [
        "400g 鲜嫩空心菜（去老梗）",
        "2头香蒜（1头切碎，1头拍裂）",
        "2大勺食用油",
        "1大勺优质蚝油",
        "1小勺鱼露",
        "冰水盆与少许粗盐"
      ],
      instructions: [
        "空心菜在加盐沸水中飞水40秒，迅速捞出浸入冰水3分钟保持碧绿爽脆。",
        "捞出沥干全部水分。",
        "热锅烧油，下拍蒜炸至金黄微焦爆香。",
        "转最大火，倒入空心菜快速翻炒。",
        "加入蚝油和鱼露翻炒1-2分钟。",
        "撒入生蒜碎快速颠匀，立即出锅装盘。"
      ],
      winePairing: "河内冰绿茶"
    }
  },

  "Đậu Hũ Sốt Cà Chua": {
    en: {
      title: "Crispy Tofu in Rich Tomato Sauce",
      ingredients: [
        "4 blocks soft white tofu",
        "3 ripe juicy red tomatoes (diced)",
        "3 scallions chopped (white parts separated)",
        "2 shallots minced",
        "1 tbsp fish sauce, 1 tsp sugar, 1/2 tsp black pepper",
        "Cooking oil for frying"
      ],
      instructions: [
        "Cut tofu into bite-sized cubes, pat dry with paper towels.",
        "Pan-fry tofu in hot oil until golden and crispy on all sides, drain on paper towels.",
        "Sauté minced shallots and white scallion parts in a little oil until fragrant.",
        "Add diced tomatoes with a pinch of salt, cook down until soft and saucy.",
        "Season with fish sauce, sugar, and 3 tbsp water; gently add fried tofu cubes and simmer for 6-8 minutes.",
        "Garnish with chopped scallions and ground pepper, serve warm with rice."
      ],
      winePairing: "Lotus seed iced tea"
    },
    zh: {
      title: "家常浓汁茄汁脆皮豆腐",
      ingredients: [
        "4块鲜嫩白豆腐",
        "3个熟透红西红柿（切小丁）",
        "3根香葱切碎（葱白分开）",
        "2个红葱头切碎",
        "1大勺鱼露、1小勺糖、1/2小勺胡椒粉",
        "煎炸用食用油"
      ],
      instructions: [
        "豆腐切适口方块，用厨房纸吸去表面水分。",
        "热油入锅中火慢煎至豆腐四周金黄酥脆，捞出沥油。",
        "锅留底油爆香葱白和红葱碎。",
        "下西红柿丁加少许盐慢炒至软烂成浓稠红酱。",
        "加入鱼露、糖和少许水调味，轻轻放入炸豆腐块小火焖煨6-8分钟充分吸汁。",
        "撒入青葱碎和黑胡椒粉即可出锅装盘。"
      ],
      winePairing: "莲子冰茶"
    }
  },

  "Gà Rang Gừng": {
    en: {
      title: "Ginger Braised Free-Range Chicken",
      ingredients: [
        "600g chicken cut into bite-sized pieces",
        "1 large ginger root, julienned finely",
        "2 shallots, 1 head garlic minced",
        "2 tbsp premium fish sauce",
        "1 tbsp brown sugar",
        "1/2 tsp turmeric powder for golden color",
        "Young kaffir lime leaves julienned, 1 bird's eye chili"
      ],
      instructions: [
        "Rinse chicken pieces with salt and ginger, drain well.",
        "Marinate chicken with fish sauce, sugar, minced shallots, garlic, turmeric, and half the ginger for 20 minutes.",
        "Sauté remaining ginger strips with oil in a pan until fragrant and crispy.",
        "Add chicken and sear over high heat until browned and rendering natural fat.",
        "Lower heat, cover with lid and braise for 15 minutes until tender and cooked through.",
        "Uncover and reduce sauce until glossy and coating chicken pieces, finish with lime leaf shreds and pepper."
      ],
      winePairing: "Warm ginger tea"
    },
    zh: {
      title: "姜丝焖走地鸡",
      ingredients: [
        "600g 优质走地鸡肉（剁块）",
        "1大块鲜老姜（去皮切细丝）",
        "2个红葱头、1头大蒜（切末）",
        "2大勺纯鱼露",
        "1大勺黄糖",
        "1/2小勺黄姜粉（上金色）",
        "青柠叶丝、1个小辣椒"
      ],
      instructions: [
        "鸡肉用姜盐搓洗干净沥干剁小块。",
        "加入鱼露、糖、葱蒜碎、黄姜粉和一半姜丝腌制20分钟。",
        "锅中热油爆香剩余姜丝至金黄芳香。",
        "下鸡块大火翻炒至表皮紧实出油微焦。",
        "盖锅盖转中小火焖煮15分钟至鸡肉酥嫩入味。",
        "开盖大火收汁至油亮浓香包裹鸡块，撒上青柠叶丝和胡椒出锅。"
      ],
      winePairing: "温姜茶"
    }
  },

  "Thịt Rang Mắm Ruốc": {
    en: {
      title: "Pork Belly Sautéed with Fermented Shrimp Paste & Lemongrass",
      ingredients: [
        "500g pork belly cut into thick strips",
        "3 tbsp Hue fermented shrimp paste (mam ruoc)",
        "4 stalks fresh lemongrass, finely minced",
        "2 bird's eye chilies minced",
        "1 head garlic, 2 shallots minced",
        "2 tbsp golden sugar"
      ],
      instructions: [
        "Mix fermented shrimp paste with 3 tbsp warm water, let settle, and strain the clear liquid.",
        "Pan-sear pork belly strips in a dry pan until lightly golden and crispy on edges.",
        "Remove pork and pour off excess lard, leaving 1 tbsp in pan.",
        "Fry garlic, shallots, lemongrass, and chili until golden and highly aromatic.",
        "Return pork belly to pan, pour in the strained shrimp paste mixture.",
        "Add sugar to balance the savory flavor, stir continuously on low heat until sauce is caramelized and glossy."
      ],
      winePairing: "Iced tea with fresh lime"
    },
    zh: {
      title: "香茅虾酱炒五花肉",
      ingredients: [
        "500g 五花肉（切条）",
        "3大勺顺化特色虾酱",
        "4根鲜香茅（细细剁碎）",
        "2个红辣椒剁碎",
        "1头大蒜、2个红葱头切末",
        "2大勺黄糖"
      ],
      instructions: [
        "虾酱加3大勺温水调匀静置沉淀取澄清酱汁。",
        "五花肉下热锅干煸炒至出油两面微黄香脆。",
        "沥出五花肉，倒出多余猪油，锅留底油。",
        "下葱蒜香茅碎和辣椒碎爆炒出浓郁香气。",
        "下入五花肉，倒入调开的虾酱汁。",
        "加黄糖调味，小火不停翻炒至虾酱浓缩挂汁、油亮鲜香。"
      ],
      winePairing: "青柠冰茶"
    }
  },

  "Canh Bầu Nấu Tôm": {
    en: {
      title: "Bottle Gourd Soup with Fresh Shrimp",
      ingredients: [
        "1 tender bottle gourd (500g), peeled and sliced or shredded",
        "200g fresh shrimp, peeled, deveined, and lightly crushed",
        "2 shallots minced",
        "Scallions and cilantro chopped",
        "1 tbsp fish sauce, white pepper, salt"
      ],
      instructions: [
        "Marinate crushed shrimp with shallots, fish sauce, and pepper for 10 minutes.",
        "Peel and slice bottle gourd into thin diagonal strips.",
        "Sauté shrimp in a pot with a touch of oil until pink and fragrant.",
        "Add 800ml water, bring to boil, and skim foam for a clear, sweet broth.",
        "Add sliced bottle gourd, simmer for 2 minutes until translucent yet crisp.",
        "Season with fish sauce and salt, top with scallions, cilantro, and freshly cracked pepper."
      ],
      winePairing: "Artichoke herbal tea"
    },
    zh: {
      title: "鲜虾清甜葫芦瓜汤",
      ingredients: [
        "1个嫩葫芦瓜（500g去皮切厚片或细丝）",
        "200g 鲜虾仁（去虾线拍碎）",
        "2个红葱头切碎",
        "葱花、香菜碎",
        "1大勺鱼露、白胡椒粉、盐"
      ],
      instructions: [
        "碎虾仁用红葱头、鱼露和胡椒腌制10分钟。",
        "葫芦瓜削皮切厚片或刮丝备用。",
        "热锅点油煸炒虾肉至变红香味溢出。",
        "注入800ml清水烧沸，撇清浮沫保持汤清。",
        "下葫芦瓜片滚煮2分钟至瓜肉晶莹剔透保持爽甜。",
        "调入鱼露和盐，撒葱花香菜与胡椒即可出锅。"
      ],
      winePairing: "洋蓟凉茶"
    }
  },

  "Cá Chiên Sốt Mắm Tỏi Ớt": {
    en: {
      title: "Crispy Whole Fish with Chili Garlic Fish Sauce Glaze",
      ingredients: [
        "1 whole red tilapia or sea bass (800g), cleaned and scored",
        "1 head garlic finely minced",
        "3 red bird's eye and horn chilies minced",
        "3 tbsp fish sauce",
        "2.5 tbsp sugar",
        "1 tbsp fresh lime juice",
        "2 tbsp warm water",
        "Oil for deep frying"
      ],
      instructions: [
        "Score diagonal cuts on fish, rinse with salted lime water and thoroughly pat dry.",
        "Deep fry fish in hot oil over medium heat until skin is golden blistered and crispy, drain.",
        "Mix fish sauce, sugar, lime juice, warm water, minced garlic, and chili until sweet, savory, and tangy.",
        "Warm the sauce in a small pan until slightly syrupy.",
        "Pour glistening garlic chili sauce over the crispy fish immediately before serving."
      ],
      winePairing: "Chilled beer or lemon iced tea"
    },
    zh: {
      title: "香脆炸鱼浇蒜辣酸甜鱼露汁",
      ingredients: [
        "1条鲜红罗非鱼或鲈鱼（约800g处理干净打花刀）",
        "1头大蒜剁细碎",
        "3个红辣椒碎",
        "3大勺优质鱼露",
        "2.5大勺白糖",
        "1大勺鲜青柠汁",
        "2大勺温水",
        "油炸用油"
      ],
      instructions: [
        "鱼身斜切花刀，青柠盐水洗净彻底吸干水分。",
        "下宽油中火炸至表皮金黄焦脆酥香，捞出沥油。",
        "调和鱼露、糖、青柠汁和水，投入蒜末辣椒碎成浓味汁。",
        "小锅稍加温煮至酱汁微稠起泡。",
        "将金黄蒜辣酱汁均匀浇淋在酥脆鱼身上享用。"
      ],
      winePairing: "冰镇啤酒"
    }
  },

  "Sườn Xào Chua Ngọt": {
    en: {
      title: "Sweet and Sour Glazed Pork Ribs",
      ingredients: [
        "500g baby pork ribs cut into 3cm pieces",
        "1/4 pineapple sliced",
        "1/2 red bell pepper and 1/2 onion cubed",
        "Minced garlic and shallots, scallions",
        "Sauce: 2 tbsp rice vinegar, 2 tbsp sugar, 2 tbsp fish sauce, 2 tbsp ketchup",
        "1 tbsp cornstarch slurry"
      ],
      instructions: [
        "Blanch ribs in boiling water with ginger for 2 minutes, rinse and pat dry.",
        "Marinate ribs with shallots, garlic, and pepper for 15 minutes.",
        "Pan-fry ribs in oil until nicely browned and slightly crisp.",
        "Whisk sauce ingredients together.",
        "Sauté garlic, pour sauce in and simmer, then toss in fried ribs and braise for 10 minutes.",
        "Add pineapple, bell pepper, and onion; cook 3 minutes, then stir in cornstarch slurry to create a glossy glaze."
      ],
      winePairing: "Fresh orange juice"
    },
    zh: {
      title: "越式菠萝彩椒糖醋排骨",
      ingredients: [
        "500g 鲜小排（切小块）",
        "1/4个熟菠萝（切片）",
        "1/2个红彩椒、半个洋葱（切方块）",
        "蒜末、葱花",
        "糖醋汁：米醋2大勺、糖2大勺、鱼露2大勺、番茄沙司2大勺",
        "1大勺水淀粉"
      ],
      instructions: [
        "排骨加姜片焯水2分钟捞出洗净沥干。",
        "用少许葱蒜和胡椒腌制15分钟。",
        "下热锅将排骨两面煎炸至金黄焦香。",
        "调好糖醋汁备用。",
        "锅爆蒜末，倒入糖醋汁烧开，下排骨小火焖烧10分钟入味。",
        "加入菠萝块、彩椒和洋葱翻炒3分钟，淋入水淀粉收成亮丽浓汁撒葱花。"
      ],
      winePairing: "鲜榨橙汁"
    }
  },

  "Trứng Chiên Thịt Bằm": {
    en: {
      title: "Savory Minced Pork Omelet",
      ingredients: [
        "4 fresh eggs",
        "150g ground pork",
        "2 shallots minced",
        "3 scallions chopped",
        "1 tbsp fish sauce",
        "1/2 tsp pepper, cooking oil"
      ],
      instructions: [
        "Season ground pork with shallots, fish sauce, and pepper for 5 minutes.",
        "Beat eggs into the pork bowl with chopped scallions until well incorporated.",
        "Heat 2 tbsp oil in a skillet over medium heat.",
        "Pour egg-meat mixture into skillet, tilting to form an even round pancake.",
        "Cover with lid for 3 minutes so pork cooks through and omelet fluffs up.",
        "Flip carefully and cook the other side for 2 minutes until golden brown."
      ],
      winePairing: "Pennywort drink"
    },
    zh: {
      title: "家常香葱肉末厚煎蛋",
      ingredients: [
        "4个新鲜鸡蛋",
        "150g 猪前腿肉末",
        "2个红葱头剁碎",
        "3根香葱切花",
        "1大勺鲜鱼露",
        "1/2小勺黑胡椒、食用油"
      ],
      instructions: [
        "肉末加入红葱碎、鱼露和胡椒腌制5分钟。",
        "将4个鸡蛋打入肉末中，撒入葱花用筷子充分搅打均匀。",
        "平底锅烧热2大勺油，晃匀锅底。",
        "倒入蛋液摊成圆形，盖锅盖中火焖煎3分钟让肉末熟透蓬松。",
        "翻面再煎2分钟至两面金黄飘香，切块装盘。"
      ],
      winePairing: "积雪草汁"
    }
  },

  "Canh Rau Ngót Thịt Bằm": {
    en: {
      title: "Katuk Sweet Leaf Soup with Minced Pork",
      ingredients: [
        "2 bunches fresh katuk leaves (washed and lightly crushed by hand)",
        "150g minced pork",
        "2 shallots minced",
        "1 tbsp fish sauce, salt, pepper"
      ],
      instructions: [
        "Pick tender katuk leaves, wash thoroughly, and bruise gently with hands so leaves cook tender and sweet.",
        "Season minced pork with shallots and a splash of fish sauce.",
        "Sauté pork in a pot with a touch of oil until crumbly and cooked.",
        "Add 800ml water, bring to boil and skim foam.",
        "Add bruised katuk leaves, boil vigorously for 3 minutes until tender green.",
        "Season with fish sauce and salt to taste, serve warm."
      ],
      winePairing: "Cool green bean tea"
    },
    zh: {
      title: "守宫木清甜肉末汤",
      ingredients: [
        "2把鲜嫩守宫木叶（甜菜叶揉碎）",
        "150g 猪肉末",
        "2个红葱头切碎",
        "1大勺鱼露、盐、胡椒粉"
      ],
      instructions: [
        "摘取守宫木嫩叶洗净，用双手轻轻揉碎以便释放清甜汁液。",
        "肉末加红葱头和少许鱼露腌制片刻。",
        "热锅点油炒散肉末出香。",
        "加入800ml水大火煮沸并撇去浮沫。",
        "投入揉过的菜叶大火滚煮3分钟至软嫩碧绿。",
        "调入鱼露和盐即可出锅，清热爽口。"
      ],
      winePairing: "绿豆水"
    }
  },

  "Bò Xào Rau Củ": {
    en: {
      title: "Stir-fried Beef with Broccoli and Mixed Vegetables",
      ingredients: [
        "300g beef tenderloin sliced thinly against the grain",
        "1 head broccoli cut into florets",
        "1 carrot sliced",
        "1/2 red bell pepper, 1/2 onion sliced",
        "Garlic minced, 1 tbsp oyster sauce, 1 tbsp soy sauce, pepper"
      ],
      instructions: [
        "Marinate beef slices with garlic, oyster sauce, pepper, and 1 tsp oil for 15 minutes.",
        "Blanch broccoli and carrots in salted boiling water for 1 minute, plunge into ice water to keep crisp.",
        "Sear beef rapidly in a smoking hot wok for 2 minutes until just cooked, set aside on a plate.",
        "Sauté garlic in wok, add carrots, broccoli, bell pepper, and onion.",
        "Season with oyster sauce and soy sauce, stir-fry 3 minutes until crisp-tender.",
        "Return beef to wok, toss for 30 seconds to combine, finish with black pepper."
      ],
      winePairing: "Lotus iced tea"
    },
    zh: {
      title: "西兰花什锦时蔬炒牛肉",
      ingredients: [
        "300g 牛里脊肉（顶刀切薄片）",
        "1朵西兰花（切小朵）",
        "1根胡萝卜（切花片）",
        "半个红甜椒、半个洋葱切片",
        "蒜末、蚝油1大勺、生抽1大勺、黑胡椒"
      ],
      instructions: [
        "牛肉用蒜末、蚝油、胡椒和少许油腌制15分钟锁住肉汁。",
        "西兰花和胡萝卜焯水1分钟过冰水保持清脆。",
        "大火热锅滑油，下牛肉大火快炒2分钟至变色盛出。",
        "原锅爆香蒜末，下胡萝卜、西兰花、彩椒和洋葱翻炒。",
        "调入蚝油生抽炒至爽脆断生。",
        "回锅牛肉大火翻炒30秒合味，撒黑胡椒出锅。"
      ],
      winePairing: "荷叶冰茶"
    }
  },

  "Tôm Rim Mặn Ngọt": {
    en: {
      title: "Savory Caramelized Glazed Shrimp",
      ingredients: [
        "400g fresh head-on shrimp with shell",
        "Garlic and shallots minced",
        "Scallions chopped",
        "2 tbsp fish sauce",
        "1.5 tbsp sugar, 1/2 tsp caramel sauce, black pepper"
      ],
      instructions: [
        "Trim shrimp antennae, wash clean, and dry thoroughly.",
        "Sear shrimp in 1 tbsp hot oil over high heat until shell turns crimson red and crisp, set aside.",
        "Combine fish sauce, sugar, caramel sauce, pepper, and 2 tbsp water.",
        "Sauté shallots and garlic in pan, pour in sauce mixture, and simmer to a bubbly syrup.",
        "Add shrimp, toss continuously on medium heat so the sauce caramelizes onto the shells.",
        "Simmer until glossy and sticky glaze covers every shrimp, garnish with scallions and pepper."
      ],
      winePairing: "Fresh coconut water"
    },
    zh: {
      title: "金牌焦香甜咸焖大虾",
      ingredients: [
        "400g 带壳鲜活大虾（剪去虾须虾枪）",
        "蒜末、红葱末",
        "葱花",
        "2大勺鱼露",
        "1.5大勺黄糖、半小勺焦糖色、黑胡椒"
      ],
      instructions: [
        "大虾剪去须足沥干水分。",
        "热油大火煸炒大虾至通体透红虾壳香脆盛出。",
        "将鱼露、糖、少许焦糖色、胡椒和水调匀。",
        "锅爆香葱蒜，倒入酱汁煮沸起稠密细泡。",
        "倒入大虾不停翻炒使酱汁紧紧包裹虾壳。",
        "焖煨至酱汁焦香油亮挂汁，撒入葱花胡椒出锅。"
      ],
      winePairing: "冰镇鲜椰汁"
    }
  },

  "Canh Bí Đỏ Nấu Xương": {
    en: {
      title: "Savory Pumpkin and Pork Bone Broth Soup",
      ingredients: [
        "400g pork rib bones chopped",
        "400g ripe sweet pumpkin cut into chunks",
        "2 shallots crushed",
        "Scallions, culantro chopped",
        "1 tbsp fish sauce, salt, pepper"
      ],
      instructions: [
        "Blanch pork bones in boiling water for 2 minutes, rinse clean.",
        "Simmer bones with 1.2 liters water and crushed shallots for 25 minutes, skimming foam for clear broth.",
        "Add pumpkin chunks, simmer gently for 10-12 minutes until soft and creamy yet intact.",
        "Season with fish sauce and salt to taste.",
        "Ladle into soup bowls, finish with chopped scallions, culantro, and fresh pepper."
      ],
      winePairing: "Warm herbal tea"
    },
    zh: {
      title: "金黄南瓜排骨养生汤",
      ingredients: [
        "400g 猪肋排骨（剁小块）",
        "400g 甜南瓜（去皮切大块）",
        "2个红葱头拍扁",
        "葱花、刺芹碎",
        "1大勺鱼露、盐、胡椒粉"
      ],
      instructions: [
        "排骨沸水焯洗干净备用。",
        "加1.2升水与拍葱头小火炖25分钟熬出香甜高汤。",
        "下入南瓜块慢炖10-12分钟至南瓜粉糯不烂。",
        "调入鱼露与盐入味。",
        "盛碗撒入葱花与刺芹、胡椒粉上桌。"
      ],
      winePairing: "温草本茶"
    }
  },

  "Thịt Kho Tiêu": {
    en: {
      title: "Black Pepper Braised Caramelized Pork",
      ingredients: [
        "500g pork belly sliced 1.5cm thick",
        "1.5 tbsp crushed black peppercorns",
        "3 tbsp fish sauce",
        "1.5 tbsp brown sugar, 1 tsp caramel sauce",
        "Shallots, garlic minced, scallions, chili"
      ],
      instructions: [
        "Cut pork into thick bite-sized pieces.",
        "Marinate with 2 tbsp fish sauce, sugar, caramel sauce, garlic, shallots, and half the crushed pepper for 20 minutes.",
        "Sear pork over medium heat until rendered and golden brown.",
        "Add 100ml warm water, bring to boil, then simmer on very low heat.",
        "Simmer 20 minutes until sauce reduces to a thick, glossy dark amber glaze.",
        "Sprinkle remaining crushed pepper, scallions, and chili, toss 30 seconds and serve hot."
      ],
      winePairing: "Iced green tea"
    },
    zh: {
      title: "浓香黑胡椒慢焖五花肉",
      ingredients: [
        "500g 五花肉（切1.5cm厚片）",
        "1.5大勺粗碎黑胡椒粒",
        "3大勺优质纯鱼露",
        "1.5大勺黄糖、1小勺焦糖色水",
        "红葱头、蒜碎、青葱、小辣椒"
      ],
      instructions: [
        "五花肉洗净切厚片。",
        "加鱼露、糖、焦糖色、葱蒜末和一半碎胡椒腌制20分钟。",
        "入锅中火慢炒至肉片出油脂微焦上色。",
        "加入100ml温水煮沸，转极小火慢焖煨煮。",
        "煨炖20分钟至汤汁收干成浓稠深琥珀亮酱。",
        "撒入剩余粗胡椒碎、葱花和辣椒圈颠匀出锅。"
      ],
      winePairing: "冰绿茶"
    }
  },

  "Cá Hấp Xì Dầu": {
    en: {
      title: "Steamed Whole Fish with Soy Sauce, Scallions & Ginger",
      ingredients: [
        "1 whole sea bass or tilapia (800g-1kg)",
        "1 ginger root julienned",
        "1 bunch scallions (white parts shredded, green parts cut)",
        "1 onion sliced thinly, 1 red chili shredded",
        "Sauce: 3 tbsp premium soy sauce, 1 tbsp oyster sauce, 1 tbsp sesame oil, 1 tbsp sugar, 3 tbsp broth",
        "2 tbsp hot smoking oil"
      ],
      instructions: [
        "Score fish diagonally, rub with rice wine and ginger to eliminate fishiness.",
        "Stuff ginger and scallions into fish cavity, place on heatproof plate.",
        "Steam in a steamer for 15-18 minutes until tender, discard accumulated liquid from plate.",
        "Simmer sauce ingredients together in a small saucepan.",
        "Cover top of fish with ginger shreds, scallion threads, onion, and red chili.",
        "Pour hot soy sauce mixture over the fish.",
        "Heat 2 tbsp oil until smoking hot, pour directly over scallions and ginger to unleash aromas."
      ],
      winePairing: "Iced oolong tea"
    },
    zh: {
      title: "广式经典葱姜豉油蒸全鱼",
      ingredients: [
        "1条鲜鲈鱼或红罗非（约800g-1kg）",
        "1块老姜（切细丝）",
        "1大把小葱（葱白切细丝卷，葱绿切段）",
        "1个洋葱切丝、红椒切丝",
        "豉油汁：优质生抽3大勺、蚝油1大勺、芝麻香油1大勺、白糖1大勺、高汤3大勺",
        "2大勺热滚油"
      ],
      instructions: [
        "鱼身斜切花刀，抹料酒姜汁去腥。",
        "鱼腹塞入姜葱放入耐热深盘。",
        "大火上汽蒸15-18分钟至熟，倒掉盘中蒸出的腥水。",
        "小锅煮开调匀的豉油汁。",
        "鱼身铺满葱丝、姜丝、洋葱丝与红椒丝。",
        "热豉油汁淋在鱼身周围。",
        "烧热2大勺滚烫食用油，猛烈浇在葱姜丝上激发出扑鼻香气。"
      ],
      winePairing: "冰乌龙茶"
    }
  },

  "Canh Cải Nấu Thịt": {
    en: {
      title: "Mustard Greens Soup with Minced Pork and Fresh Ginger",
      ingredients: [
        "400g tender mustard greens or bok choy (cut into 3cm sections)",
        "150g minced pork",
        "1 thumb-sized fresh ginger root (crushed)",
        "2 shallots minced",
        "1 tbsp fish sauce, salt, pepper"
      ],
      instructions: [
        "Wash mustard greens thoroughly and drain well.",
        "Marinate minced pork with shallots, fish sauce, and pepper for 10 minutes.",
        "Sauté pork in a pot with a little oil until fragrant.",
        "Add 800ml water and crushed ginger, bring to boil and skim foam.",
        "Add mustard greens, boil rapidly over high heat for 2-3 minutes until tender-crisp and vibrant green.",
        "Season with fish sauce and salt to taste, serve warm."
      ],
      winePairing: "Honey ginger warm tea"
    },
    zh: {
      title: "暖胃姜香芥菜肉末汤",
      ingredients: [
        "400g 鲜嫩芥菜或小白菜（切段）",
        "150g 猪肉碎",
        "1小块鲜老姜（拍裂）",
        "2个红葱头剁碎",
        "1大勺鱼露、盐、胡椒粉"
      ],
      instructions: [
        "芥菜洗净沥干切小段备用。",
        "肉碎用葱花、少许鱼露和胡椒腌制10分钟。",
        "锅底热油炒散肉末出香。",
        "倒入800ml水和拍姜块大火煮沸撇沫。",
        "投入芥菜大火滚煮2-3分钟保持翠绿清脆。",
        "调入鱼露和盐即可热饮，暖胃驱寒。"
      ],
      winePairing: "蜂蜜姜茶"
    }
  },

  "Mực Xào Cần Tây": {
    en: {
      title: "Stir-fried Squid with Crunchy Celery and Sweet Onions",
      ingredients: [
        "400g fresh squid (cleaned, cross-scored into pinecone pattern, cut bite-sized)",
        "2 stalks celery cut into sections",
        "1 onion cut into wedges",
        "1 tomato cut into wedges, 1/2 carrot sliced",
        "3 cloves garlic minced",
        "1 tbsp oyster sauce, 1 tsp fish sauce, lots of freshly ground black pepper"
      ],
      instructions: [
        "Score crosshatch pattern on squid, quickly blanch in boiling water with ginger and rice wine for 30 seconds, then shock in ice water to maintain crisp texture without water leakage.",
        "Marinate squid with garlic, oyster sauce, and pepper for 10 minutes.",
        "Sear squid over smoking high heat for 1.5 minutes, remove immediately onto a plate.",
        "In the same wok, toss celery, onions, carrots, and tomatoes over high heat for 2 minutes.",
        "Return squid to wok, toss rapidly to combine with seasonings.",
        "Sprinkle generously with black pepper and serve hot."
      ],
      winePairing: "Ice-cold beer or lime soda"
    },
    zh: {
      title: "爽脆芹菜洋葱爆炒鲜鱿花",
      ingredients: [
        "400g 鲜鱿鱼（洗净打十字花刀切片）",
        "2根西芹（切斜段）",
        "1个洋葱（切瓣）",
        "1个西红柿切角、半根胡萝卜切片",
        "3瓣大蒜切碎",
        "1大勺蚝油、1小勺鱼露、大量现磨黑胡椒"
      ],
      instructions: [
        "鱿鱼打花刀，姜酒沸水中焯水30秒迅速浸入冰水保持爽脆不出水。",
        "鱿鱼加蒜末、少许蚝油和胡椒腌制10分钟。",
        "大火热锅爆炒鱿鱼1.5分钟迅速盛出备用。",
        "同锅爆炒西芹、洋葱、胡萝卜和西红柿大火翻炒2分钟断生。",
        "倒入鱿鱼大火迅速翻颠合味。",
        "撒入足量黑胡椒碎出锅装盘。"
      ],
      winePairing: "冰镇啤酒"
    }
  },

  "Rau Củ Luộc Kho Quẹt": {
    en: {
      title: "Boiled Garden Vegetables with Caramelized Crispy Pork & Dried Shrimp Dip (Kho Quet)",
      ingredients: [
        "Assorted fresh vegetables: cabbage, carrots, okra, green beans, cauliflower, baby gourd",
        "150g pork fat or belly diced into cubes (for crispy pork cracklings)",
        "50g dried baby shrimp soaked in warm water",
        "4 tbsp premium anchovy fish sauce",
        "3 tbsp brown or palm sugar",
        "2 tbsp water",
        "Shallots, minced garlic, bird's eye chilies, green peppercorns crushed"
      ],
      instructions: [
        "Render diced pork fat in a pan until golden and crispy cracklings form, drain.",
        "Cut vegetables into neat batons; blanch in salted boiling water until tender-crisp, then shock in ice water for vibrant colors.",
        "In a clay pot, sauté shallots and garlic in 1 tbsp pork lard, add softened dried shrimp and fry until fragrant.",
        "Pour in the mixture of fish sauce, sugar, and water; simmer on low heat for 10-15 minutes until thick, syrupy, and amber.",
        "Toss in crispy pork cracklings, crushed peppercorns, and whole chilies; cook 2 more minutes.",
        "Arrange vibrant rainbow vegetables around the sizzling clay pot of savory-sweet caramelized dip."
      ],
      winePairing: "Jasmine iced tea"
    },
    zh: {
      title: "五彩白灼时蔬拼盘蘸焦香酥脆肉渣虾干酱（Kho Quet）",
      ingredients: [
        "五彩时蔬：卷心菜、胡萝卜、秋葵、四季豆、白花菜、嫩葫芦瓜",
        "150g 猪肥膘切小丁（熬制金黄酥脆猪油渣）",
        "50g 小虾干（温水泡软）",
        "4大勺特级纯鱼露",
        "3大勺黄糖或棕榈糖",
        "2大勺清水",
        "红葱头、蒜碎、红辣椒、青花椒粒"
      ],
      instructions: [
        "猪肥肉丁入锅慢火炸出油脂，捞出金黄焦脆的油渣沥干。",
        "蔬菜切长条，在加盐开水中分批白灼捞出过冰水保持鲜亮爽脆。",
        "瓦煲加1勺猪油爆香葱蒜，下虾干慢炒至香脆。",
        "倒入调好的鱼露糖水，小火慢煨10-15分钟至浓稠挂勺呈琥珀色。",
        "撒入金黄酥脆油渣、青花椒和整粒小辣椒焖煨2分钟关火。",
        "五彩蔬菜环绕滚烫瓦煲摆盘，蘸取浓郁咸甜焦香肉酱享用，极致开胃下饭。"
      ],
      winePairing: "茉莉冰茶"
    }
  }
};
