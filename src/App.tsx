import { useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  Timestamp,
  setDoc,
  getDoc,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { 
  auth, 
  db, 
  signIn, 
  logOut 
} from './firebase';
import { 
  Recipe, 
  Household, 
  Category,
  MealPlanItem,
  GroceryItem
} from './types';
import { NEW_LUNCH_20_RECIPES, NEW_LUNCH_20_TRANSLATIONS } from './lunchRecipes';
import { VIETNAM_100_RECIPES } from './vietnam100Recipes';
import { compressImage, estimateObjectSize } from './utils/imageUtils';
import { PrintRecipeModal, PrintableRecipeContent } from './components/PrintRecipeModal';
import { 
  extractRecipeFromUrl,
  generateRecipe,
  generateRecipeImage
} from './services/geminiService';
import { 
  Plus, 
  Search, 
  Link as LinkIcon, 
  LogOut, 
  Users, 
  Star, 
  ChevronRight, 
  ChefHat, 
  X, 
  Loader2,
  Trash2,
  Edit2,
  Clock,
  Utensils,
  AlertCircle,
  Soup,
  Sparkles,
  Sun,
  Moon,
  Calendar,
  Camera,
  Upload,
  ShoppingCart,
  BookOpen,
  Heart,
  Play,
  Wine,
  Globe,
  Activity,
  Download,
  Check,
  GripVertical,
  Mic,
  Volume2,
  Share2,
  Settings,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  Wifi,
  WifiOff,
  HardDrive,
  Save,
  Printer,
  Filter,
  FileText,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NomNowLogo = ({ className = "w-9 h-9" }: { className?: string }) => (
  <svg viewBox="0 0 500 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
      <linearGradient id="leafGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#84cc16" />
      </linearGradient>
    </defs>
    
    <path d="M250 160 C 230 130, 200 90, 190 70 C 210 90, 240 120, 250 160 Z" fill="url(#leafGradient)" />
    <path d="M250 160 C 270 130, 300 90, 310 70 C 290 90, 260 120, 250 160 Z" fill="url(#leafGradient)" />
    <path d="M230 180 C 200 160, 160 130, 140 110 C 165 130, 200 155, 230 180 Z" fill="#22c55e" opacity="0.9" />
    <path d="M270 180 C 300 160, 340 130, 360 110 C 335 130, 300 155, 270 180 Z" fill="#22c55e" opacity="0.9" />

    <path d="M120 220 
             C 120 190, 140 170, 170 170 
             L 220 170 
             C 240 170, 255 185, 265 200 
             L 310 280 
             L 330 200 
             C 335 180, 355 170, 380 170 
             L 380 170 
             C 410 170, 430 190, 430 220 
             L 430 380 
             C 430 410, 410 430, 380 430 
             L 350 430 
             C 325 430, 310 415, 295 390 
             L 240 300 
             L 210 400 
             C 203 420, 185 430, 165 430 
             L 120 430 
             C 90 430, 70 410, 70 380 
             Z" 
          fill="url(#nGradient)" />

    <g transform="translate(95, 230) scale(0.65)">
      <rect x="22" y="110" width="8" height="150" rx="4" fill="white" />
      <path d="M16 110 L36 110 L32 80 L20 80 Z" fill="white" />
      <rect x="14" y="20" width="5" height="60" rx="2.5" fill="white" />
      <rect x="23" y="20" width="5" height="60" rx="2.5" fill="white" />
      <rect x="32" y="20" width="5" height="60" rx="2.5" fill="white" />
      <path d="M14 40 L37 40 L37 60 L14 60 Z" fill="white" />
    </g>

    <g transform="translate(305, 210) scale(0.65)">
      <rect x="22" y="120" width="8" height="140" rx="4" fill="white" />
      <ellipse cx="26" cy="70" rx="22" ry="32" fill="white" />
    </g>
  </svg>
);
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area, Legend, Tooltip } from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Translations ---

const translations = {
  vi: {
    appTitle: "NomNow",
    subtitle: "Bếp của {name}",
    recipeBook: "Công Thức",
    mealPlanner: "Thực Đơn",
    groceryList: "Đi Chợ",
    whatToCook: "Hôm nay ăn gì?",
    cookDesc: "Khám phá và lưu trữ bữa ăn tuyệt vời.",
    aiChef: "AI Bếp Trưởng",
    importUrl: "Nhập Link",
    addRecipe: "Thêm Món",
    searchPlaceholder: "Tìm món ăn, nguyên liệu...",
    favorites: "Yêu thích",
    all: "Tất cả",
    breakfast: "Sáng",
    lunch: "Trưa",
    dinner: "Tối",
    dessert: "Tráng miệng",
    snack: "Ăn vặt",
    drink: "Đồ uống",
    other: "Khác",
    noRecipes: "Không tìm thấy công thức",
    noRecipesDesc: "Thử tìm từ khóa khác hoặc thêm món mới.",
    ingredients: "Nguyên Liệu",
    instructions: "Các Bước",
    cookingMode: "Nấu Ăn",
    addToGrocery: "Thêm đi chợ",
    edit: "Sửa",
    delete: "Xóa",
    sureToDelete: "Chắc chắn xóa?",
    yesDelete: "Xóa",
    cancel: "Hủy",
    winePairing: "Gợi ý đồ uống:",
    step: "Bước",
    complete: "Hoàn thành!",
    prevStep: "Quay lại",
    nextStep: "Tiếp theo",
    saveRecipe: "Lưu",
    recipeTitle: "Tên món ăn",
    category: "Danh mục",
    rating: "Đánh giá (1-5)",
    timeMinutes: "Phút",
    tags: "Thẻ (cách nhau bằng phẩy)",
    ingredientsLabel: "Nguyên liệu (Mỗi dòng 1 ý)",
    instructionsLabel: "Các bước (Mỗi dòng 1 bước)",
    imageUrl: "Hình ảnh món ăn",
    uploadImageTab: "Tải ảnh / Chụp ảnh",
    urlImageTab: "Link ảnh web",
    optimizingImage: "Đang nén & tối ưu ảnh...",
    imageOptimized: "Đã tối ưu",
    printRecipe: "In công thức",
    recipeFilterTitle: "Lọc món ăn",
    regionFilter: "Vùng miền:",
    needFilter: "Nhu cầu:",
    seasonFilter: "Mùa và Dịp:",
    regionAll: "Tất cả vùng",
    regionNorth: "Miền Bắc",
    regionCentral: "Miền Trung",
    regionSouth: "Miền Nam",
    regionInter: "Quốc tế",
    needAll: "Tất cả nhu cầu",
    needFamily: "Cơm gia đình",
    needQuick: "Ăn nhanh",
    needSchool: "Mang đi học",
    needParty: "Tiệc gia đình",
    seasonAll: "Tất cả mùa & dịp",
    seasonHot: "Mùa nóng",
    seasonCold: "Mùa lạnh",
    seasonTet: "Tết",
    seasonMidAutumn: "Trung thu",
    seasonWeekend: "Cuối tuần",
    importModalTitle: "Nhập Từ Website",
    importUrlLabel: "Đường dẫn URL",
    extracting: "Đang đọc...",
    extractBtn: "Trích Xuất",
    importHint: "Gemini AI tự động lọc quảng cáo và lấy công thức.",
    aiModalTitle: "AI Tạo Công Thức",
    mealType: "Bữa",
    aiDetails: "Yêu cầu thêm (Tùy chọn)",
    generating: "Đang tạo...",
    generateBtn: "Tạo Món & Ảnh",
    aiHint: "AI sẽ sáng tạo công thức độc quyền cho bạn.",
    kitchenManagement: "Quản Lý Bếp",
    switchKitchen: "Đổi bếp",
    createNewKitchen: "Tạo Bếp",
    kitchenNamePlaceholder: "Tên bếp...",
    createKitchenBtn: "Tạo",
    deleteKitchen: "Xóa Bếp Này",
    weeklyPlannerTitle: "Thực Đơn Tuần",
    weeklyPlannerDesc: "Lên kế hoạch ăn uống trong tuần.",
    addMeal: "Thêm",
    groceryTitle: "Đi Chợ",
    groceryDesc: "Danh sách mua sắm nguyên liệu.",
    groceryPlaceholder: "Thêm món cần mua...",
    addBtn: "Thêm",
    groceryEmpty: "Danh sách trống. Thêm từ công thức bất kỳ!",
    nutritionInfo: "Thông tin dinh dưỡng",
    calories: "Calories",
    protein: "Protein",
    fat: "Chất béo",
    carbs: "Tinh bột",
    classification: "Phân loại:",
    allTypes: "Tất cả loại",
    subTea: "Trà",
    subSmoothie: "Sinh tố",
    subRefresh: "Giải nhiệt",
    subVeg: "Món Chay",
    subMeat: "Món Thịt",
    subSeafood: "Hải Sản",
    subProduce: "Rau/Trái Cây",
    subSoup: "Món Canh",
    subRice: "Cơm Nhà",
    notes: "Ghi chú & Mẹo nấu ăn",
    successMealAdded: "Đã thêm {count} nguyên liệu món \"{title}\" vào danh sách Đi chợ!",
    successMealTitle: "Thành công thêm món",
    dailySummary: "Tổng kết dinh dưỡng hôm nay",
    totalCalories: "Tổng Calories",
    totalProtein: "Protein",
    totalFat: "Chất béo",
    totalCarbs: "Tinh bột",
    weeklyHealthStats: "Biểu đồ dinh dưỡng & sức khỏe tuần",
    weeklyHealthDesc: "Thống kê lượng Calories, Protein, Fat, Carbs trong tuần dựa trên thực đơn đã lên",
    calorieTab: "Calories (kcal)",
    macroTab: "Đa lượng (Protein, Fat, Carbs)",
    weeklyTotal: "Tổng tuần",
    weeklyAverage: "Trung bình ngày",
    noMealsToday: "Chưa có món ăn nào được lên lịch cho hôm nay.",
    readAloud: "Đọc bước này",
    voiceControl: "Điều khiển giọng nói",
    listeningVoice: "Đang nghe lệnh (Tiếp, Lùi, Đọc)...",
    voiceHint: "Nói 'Tiếp', 'Quay lại', hoặc 'Đọc' để điều khiển rảnh tay.",
    voiceControlToggle: "Điều khiển giọng nói rảnh tay",
    timeFilter: "Thời gian nấu",
    quickMeals: "⚡ Món nhanh (≤ 20p)",
    mediumMeals: "⏱️ Vừa vặn (20 - 45p)",
    slowMeals: "🍲 Nhiều thời gian (≥ 45p)",
    verySlowMeals: "⏳ Hầm kỳ công (≥ 60p)",
    allTimes: "✨ Tất cả thời gian",
    maxTimeSlider: "Thời gian nấu tối đa",
    minTimeSlider: "Thời gian nấu tối thiểu",
    unlimitedMax: "Không giới hạn (180+ phút)",
    noMinRequired: "Từ 0 phút (Không yêu cầu)",
    minutesSuffix: "phút",
    resetFilter: "Đặt lại",
    matchingDishes: "Hiển thị {count} món ăn",
    noRecipesInTime: "Không có món ăn nào trong khoảng thời gian này. Hãy kéo thanh trượt hoặc bấm Đặt lại.",
    supermarketProduce: "🥦 Rau củ & Trái cây",
    supermarketMeat: "🥩 Thịt & Hải sản tươi",
    supermarketDairy: "🥛 Sữa, Bơ & Trứng",
    supermarketBakery: "🥖 Bánh mì & Đồ nướng",
    supermarketPantry: "🥫 Đồ khô, Gạo & Gia vị",
    supermarketBeverage: "🧃 Đồ uống & Giải khát",
    supermarketFrozen: "❄️ Thực phẩm đông lạnh",
    supermarketHousehold: "🧼 Tiêu dùng & Gia đình",
    supermarketOther: "📦 Khu vực khác",
    accountAndKitchen: "Tài khoản & Bếp của tôi",
    termsTitle: "Điều khoản sử dụng",
    privacyTitle: "Chính sách bảo mật",
    supportTitle: "Liên hệ hỗ trợ",
    rateAppTitle: "Đánh giá ứng dụng",
    termsContent: "Chào mừng bạn đến với NomNow. Bằng cách sử dụng ứng dụng của chúng tôi, bạn đồng ý tuân thủ các điều khoản dịch vụ bao gồm việc sử dụng công thức nấu ăn, chia sẻ dữ liệu bếp gia đình một cách văn minh và bảo vệ tài khoản cá nhân.",
    privacyContent: "NomNow cam kết bảo vệ quyền riêng tư của bạn. Mọi dữ liệu cá nhân, thông tin tài khoản và danh sách công thức, thực đơn của bạn được lưu trữ an toàn trên nền tảng Firebase Firestore và không bao giờ được chia sẻ với bên thứ ba.",
    supportContent: "Cần trợ giúp hoặc góp ý tính năng mới? Hãy liên hệ với chúng tôi qua email: support@nomnow.app hoặc Hotline: 1900-NOMNOW (8:00 - 22:00 hàng ngày).",
    ratePrompt: "Bạn cảm thấy trải nghiệm nấu ăn cùng NomNow thế nào?",
    rateThank: "Cảm ơn bạn đã đánh giá {stars} sao! Phản hồi của bạn giúp chúng tôi hoàn thiện hơn mỗi ngày.",
    autoCategorizeBtn: "⚡ Tự động phân loại siêu thị",
    autoReorderRouteBtn: "🔄 Sắp xếp lộ trình siêu thị",
    autoCategorizeSuccess: "Đã tự động phân loại {count} nguyên liệu theo đúng khu vực siêu thị!",
    supermarketRouteHint: "🛒 Lộ trình mua sắm thông minh: Rau củ ➔ Thịt cá ➔ Sữa ➔ Bánh mì ➔ Đồ khô ➔ Đông lạnh",
    allAisles: "Tất cả khu vực",
    aisleCompleted: "Đã nhặt đủ khu vực này!",
    itemsCheckedRatio: "{checked}/{total} món đã lấy",
    clearCheckedBtn: "Dọn món đã mua",
    autoDetectedAisle: "⚡ Nhận diện khu vực:",
    autoOption: "⚡ Tự động nhận diện (Khuyên dùng)",
    addPlannerToGrocery: "🛒 Thêm thực đơn tuần vào Đi chợ",
    offlineMode: "Chế độ Ngoại Tuyến (Offline Mode)",
    offlineReadyBadge: "Đã lưu vào máy",
    saveOfflineBtn: "Lưu nấu Offline",
    savedOfflineBtn: "Đã lưu Offline",
    offlineNotice: "⚡ Bạn đang ngoại tuyến. Các bước nấu ăn đã được lưu vào bộ nhớ máy, bạn có thể tiếp tục nấu bình thường không cần mạng!",
    offlineStorageSuccess: "Đã lưu các bước nấu ăn vào máy để xem Offline!",
    offlineStorageRemoved: "Đã xóa công thức khỏi bộ nhớ ngoại tuyến.",
    resumeCookingBanner: "Tiếp tục nấu: {title} (Bước {step}/{total})",
    continueCookingBtn: "Tiếp tục nấu",
    offlineFilterBtn: "💾 Đã lưu Offline",
    offlineModalTitle: "Công Thức Đã Lưu Ngoại Tuyến",
    offlineModalDesc: "Các món ăn đã lưu vào bộ nhớ thiết bị (localStorage), xem và nấu bình thường ngay cả khi không có mạng Internet.",
    cookingIngredientsList: "Nguyên liệu cần chuẩn bị",
    noOfflineRecipes: "Chưa có món nào được lưu ngoại tuyến. Hãy mở công thức bất kỳ và bấm 'Lưu nấu Offline'!",
    load20LunchBtn: "🍱 20 Món Cơm Trưa"
  },
  en: {
    appTitle: "NomNow",
    subtitle: "{name}'s Kitchen",
    recipeBook: "Recipes",
    mealPlanner: "Planner",
    groceryList: "Grocery",
    whatToCook: "What's cooking?",
    cookDesc: "Discover and organize your favorite recipes.",
    aiChef: "AI Chef",
    importUrl: "Import",
    addRecipe: "Add",
    searchPlaceholder: "Search recipes or ingredients...",
    favorites: "Favorites",
    all: "All",
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    dessert: "Dessert",
    snack: "Snack",
    drink: "Drink",
    other: "Other",
    noRecipes: "No recipes found",
    noRecipesDesc: "Try adjusting search or add a recipe.",
    ingredients: "Ingredients",
    instructions: "Instructions",
    cookingMode: "Cooking Mode",
    addToGrocery: "To Grocery",
    edit: "Edit",
    delete: "Delete",
    sureToDelete: "Are you sure?",
    yesDelete: "Delete",
    cancel: "Cancel",
    winePairing: "Drink Pairing:",
    step: "Step",
    complete: "Done!",
    prevStep: "Prev",
    nextStep: "Next",
    saveRecipe: "Save",
    recipeTitle: "Recipe Title",
    category: "Category",
    rating: "Rating (1-5)",
    timeMinutes: "Minutes",
    tags: "Tags (comma separated)",
    ingredientsLabel: "Ingredients (One per line)",
    instructionsLabel: "Instructions (One per line)",
    imageUrl: "Dish Image",
    uploadImageTab: "Upload / Camera",
    urlImageTab: "Image URL",
    optimizingImage: "Optimizing image...",
    imageOptimized: "Optimized",
    printRecipe: "Print Recipe",
    recipeFilterTitle: "Recipe Filters",
    regionFilter: "Region:",
    needFilter: "Purpose:",
    seasonFilter: "Season & Occasion:",
    regionAll: "All Regions",
    regionNorth: "Northern",
    regionCentral: "Central",
    regionSouth: "Southern",
    regionInter: "International",
    needAll: "All Purposes",
    needFamily: "Family Meal",
    needQuick: "Quick Meal",
    needSchool: "School Lunchbox",
    needParty: "Party",
    seasonAll: "All Seasons",
    seasonHot: "Hot Season",
    seasonCold: "Cold Season",
    seasonTet: "Tet Holiday",
    seasonMidAutumn: "Mid-Autumn",
    seasonWeekend: "Weekend",
    importModalTitle: "Import Recipe",
    importUrlLabel: "URL",
    extracting: "Extracting...",
    extractBtn: "Extract",
    importHint: "Gemini AI parses the recipe page cleanly.",
    aiModalTitle: "AI Recipe Generator",
    mealType: "Meal",
    aiDetails: "Preferences (Optional)",
    generating: "Generating...",
    generateBtn: "Generate",
    aiHint: "AI creates a custom recipe & photo.",
    kitchenManagement: "Kitchens",
    switchKitchen: "Switch",
    createNewKitchen: "Create Kitchen",
    kitchenNamePlaceholder: "Name...",
    createKitchenBtn: "Create",
    deleteKitchen: "Delete",
    weeklyPlannerTitle: "Meal Plan",
    weeklyPlannerDesc: "Plan your weekly meals ahead.",
    addMeal: "Add",
    groceryTitle: "Grocery List",
    groceryDesc: "Shopping items needed.",
    groceryPlaceholder: "Add item...",
    addBtn: "Add",
    groceryEmpty: "Grocery list is empty.",
    nutritionInfo: "Nutrition Info",
    calories: "Calories",
    protein: "Protein",
    fat: "Fat",
    carbs: "Carbs",
    classification: "Type:",
    allTypes: "All Types",
    subTea: "Tea",
    subSmoothie: "Smoothie",
    subRefresh: "Refreshing",
    subVeg: "Vegetarian",
    subMeat: "Meat",
    subSeafood: "Seafood",
    subProduce: "Produce/Fruit",
    subSoup: "Soup",
    subRice: "Family Meal",
    notes: "Notes & Prep Tips",
    successMealAdded: "Added {count} ingredients from \"{title}\" to Grocery List!",
    successMealTitle: "Success this Meal",
    dailySummary: "Today's Daily Summary",
    totalCalories: "Total Calories",
    totalProtein: "Protein",
    totalFat: "Fat",
    totalCarbs: "Carbs",
    weeklyHealthStats: "Weekly Health & Nutrition Analytics",
    weeklyHealthDesc: "Track your weekly Calories, Protein, Fat, and Carbs consumption from your meal plans",
    calorieTab: "Calories (kcal)",
    macroTab: "Macronutrients (Protein, Fat, Carbs)",
    weeklyTotal: "Weekly Total",
    weeklyAverage: "Daily Average",
    noMealsToday: "No meals scheduled for today yet.",
    readAloud: "Read Aloud",
    voiceControl: "Voice Control",
    listeningVoice: "Listening (Next, Back, Read)...",
    voiceHint: "Say 'Next', 'Back', or 'Read' for hands-free control.",
    voiceControlToggle: "Hands-Free Voice Control",
    timeFilter: "Cooking Time",
    quickMeals: "⚡ Quick meals (≤ 20m)",
    mediumMeals: "⏱️ Medium (20 - 45m)",
    slowMeals: "🍲 Slow / Elaborate (≥ 45m)",
    verySlowMeals: "⏳ Simmered / Broth (≥ 60m)",
    allTimes: "✨ Any time",
    maxTimeSlider: "Maximum cooking time",
    minTimeSlider: "Minimum cooking time",
    unlimitedMax: "No limit (180+ mins)",
    noMinRequired: "From 0 mins (Any)",
    minutesSuffix: "mins",
    resetFilter: "Reset",
    matchingDishes: "Showing {count} recipes",
    noRecipesInTime: "No recipes found in this time range. Adjust sliders or tap Reset.",
    supermarketProduce: "🥦 Fresh Produce & Fruits",
    supermarketMeat: "🥩 Meat & Fresh Seafood",
    supermarketDairy: "🥛 Dairy, Butter & Eggs",
    supermarketBakery: "🥖 Bakery & Bread",
    supermarketPantry: "🥫 Pantry, Grains & Spices",
    supermarketBeverage: "🧃 Drinks & Beverages",
    supermarketFrozen: "❄️ Frozen Foods",
    supermarketHousehold: "🧼 Household & Cleaning",
    supermarketOther: "📦 Other Items",
    accountAndKitchen: "Account & My Kitchen",
    termsTitle: "Terms of Service",
    privacyTitle: "Privacy Policy",
    supportTitle: "Support & Contact",
    rateAppTitle: "Rate App",
    termsContent: "Welcome to NomNow. By using our app, you agree to comply with our terms of service, including responsible recipe usage and civil sharing of household kitchen data.",
    privacyContent: "NomNow is committed to protecting your privacy. All personal data, account info, recipes, and meal plans are securely stored on Firebase Firestore and never shared with third parties.",
    supportContent: "Need help or have feature requests? Contact us at support@nomnow.app or call Hotline: 1900-NOMNOW (8:00 AM - 10:00 PM daily).",
    ratePrompt: "How do you like your cooking experience with NomNow?",
    rateThank: "Thank you for rating {stars} stars! Your feedback helps us improve every day.",
    autoCategorizeBtn: "⚡ Auto-Classify Supermarket Aisles",
    autoReorderRouteBtn: "🔄 Smart Route Sort",
    autoCategorizeSuccess: "Organized {count} items into supermarket aisles!",
    supermarketRouteHint: "🛒 Smart shopping route: Produce ➔ Meat ➔ Dairy ➔ Bakery ➔ Pantry ➔ Frozen",
    allAisles: "All Aisles",
    aisleCompleted: "Aisle completed!",
    itemsCheckedRatio: "{checked}/{total} picked",
    clearCheckedBtn: "Clear picked items",
    autoDetectedAisle: "⚡ Detected Aisle:",
    autoOption: "⚡ Auto-Detect Aisle (Recommended)",
    addPlannerToGrocery: "🛒 Add Weekly Plan to Grocery",
    offlineMode: "Offline Cooking Mode",
    offlineReadyBadge: "Saved to Device",
    saveOfflineBtn: "Save for Offline",
    savedOfflineBtn: "Saved Offline",
    offlineNotice: "⚡ You are offline. Cooking steps are saved to local storage, you can cook without internet!",
    offlineStorageSuccess: "Recipe steps saved to device for offline cooking!",
    offlineStorageRemoved: "Recipe removed from offline storage.",
    resumeCookingBanner: "Resume cooking: {title} (Step {step}/{total})",
    continueCookingBtn: "Resume Cooking",
    offlineFilterBtn: "💾 Offline Saved",
    offlineModalTitle: "Offline Saved Recipes",
    offlineModalDesc: "Recipes stored on your device, ready to cook anytime without an internet connection.",
    cookingIngredientsList: "Ingredients Checklist",
    noOfflineRecipes: "No offline recipes yet. Open any recipe and tap 'Save for Offline'!",
    load20LunchBtn: "🍱 20 Lunch Specials"
  },
  zh: {
    appTitle: "NomNow",
    subtitle: "{name} 的厨房",
    recipeBook: "食谱",
    mealPlanner: "菜单",
    groceryList: "购物",
    whatToCook: "今天吃什么？",
    cookDesc: "发现并整理您的拿手好菜。",
    aiChef: "AI 厨师",
    importUrl: "导入",
    addRecipe: "添加",
    searchPlaceholder: "搜索食谱或食材...",
    favorites: "收藏",
    all: "全部",
    breakfast: "早餐",
    lunch: "午餐",
    dinner: "晚餐",
    dessert: "甜点",
    snack: "零食",
    drink: "饮品",
    other: "其他",
    noRecipes: "未找到食谱",
    noRecipesDesc: "尝试其他关键词或添加新食谱。",
    ingredients: "食材",
    instructions: "步骤",
    cookingMode: "烹饪",
    addToGrocery: "加入购物",
    edit: "编辑",
    delete: "删除",
    sureToDelete: "确定删除？",
    yesDelete: "删除",
    cancel: "取消",
    winePairing: "搭配建议：",
    step: "步骤",
    complete: "完成！",
    prevStep: "上一步",
    nextStep: "下一步",
    saveRecipe: "保存",
    recipeTitle: "菜名",
    category: "分类",
    rating: "评分",
    timeMinutes: "分钟",
    tags: "标签",
    ingredientsLabel: "食材 (每行一个)",
    instructionsLabel: "步骤 (每行一步)",
    imageUrl: "菜品图片",
    uploadImageTab: "上传/拍照",
    urlImageTab: "图片链接",
    optimizingImage: "正在压缩优化...",
    imageOptimized: "已优化",
    printRecipe: "打印食谱",
    recipeFilterTitle: "菜品筛选",
    regionFilter: "地区:",
    needFilter: "用途:",
    seasonFilter: "季节与节日:",
    regionAll: "全部地区",
    regionNorth: "北方菜",
    regionCentral: "中部菜",
    regionSouth: "南方菜",
    regionInter: "国际美食",
    needAll: "全部用途",
    needFamily: "家庭正餐",
    needQuick: "快手简餐",
    needSchool: "便当带饭",
    needParty: "聚会大餐",
    seasonAll: "全部季节",
    seasonHot: "消暑热季",
    seasonCold: "暖汤寒季",
    seasonTet: "春节",
    seasonMidAutumn: "中秋",
    seasonWeekend: "周末休闲",
    importModalTitle: "网址导入",
    importUrlLabel: "网址",
    extracting: "解析中...",
    extractBtn: "提取",
    importHint: "AI 自动提取食谱内容。",
    aiModalTitle: "AI 生成食谱",
    mealType: "餐点",
    aiDetails: "偏好 (可选)",
    generating: "生成中...",
    generateBtn: "生成",
    aiHint: "AI 定制专属食谱。",
    kitchenManagement: "厨房管理",
    switchKitchen: "切换",
    createNewKitchen: "新建",
    kitchenNamePlaceholder: "名称...",
    createKitchenBtn: "创建",
    deleteKitchen: "删除",
    weeklyPlannerTitle: "每周菜单",
    weeklyPlannerDesc: "合理规划三餐。",
    addMeal: "添加",
    groceryTitle: "购物清单",
    groceryDesc: "所需采购物品。",
    groceryPlaceholder: "添加...",
    addBtn: "添加",
    groceryEmpty: "清单为空。",
    nutritionInfo: "营养成分",
    calories: "卡路里",
    protein: "蛋白质",
    fat: "脂肪",
    carbs: "碳水化合物",
    classification: "分类:",
    allTypes: "全部类型",
    subTea: "茶饮",
    subSmoothie: "冰沙",
    subRefresh: "清凉解暑",
    subVeg: "素食",
    subMeat: "肉类",
    subSeafood: "海鲜",
    subProduce: "蔬菜/水果",
    subSoup: "汤品",
    subRice: "家常便饭",
    notes: "烹饪笔记与小贴士",
    successMealAdded: "已将“{title}”的 {count} 种食材加入购物清单！",
    successMealTitle: "本餐添加成功",
    dailySummary: "今日营养总结",
    totalCalories: "总热量",
    totalProtein: "蛋白质",
    totalFat: "脂肪",
    totalCarbs: "碳水化合物",
    weeklyHealthStats: "每周健康与营养统计图表",
    weeklyHealthDesc: "根据餐饮计划追踪每周热量、蛋白质、脂肪和碳水化合物摄入量",
    calorieTab: "热量 (kcal)",
    macroTab: "常量营养素 (蛋白质, 脂肪, 碳水)",
    weeklyTotal: "每周总计",
    weeklyAverage: "每日平均",
    noMealsToday: "今天还没有安排餐点。",
    readAloud: "朗读步骤",
    voiceControl: "语音控制",
    listeningVoice: "正在聆听指令 (下一步, 上一步)...",
    voiceHint: "说‘下一步’、‘上一步’或‘朗读’实现免提控制。",
    voiceControlToggle: "免提语音控制",
    timeFilter: "烹饪时间",
    quickMeals: "⚡ 快手菜 (≤ 20分)",
    mediumMeals: "⏱️ 适中 (20 - 45分)",
    slowMeals: "🍲 功夫菜/慢炖 (≥ 45分)",
    verySlowMeals: "⏳ 慢火熬煮 (≥ 60分)",
    allTimes: "✨ 全部时间",
    maxTimeSlider: "最长烹饪时间",
    minTimeSlider: "最短烹饪时间",
    unlimitedMax: "不限 (180+ 分钟)",
    noMinRequired: "从 0 分钟起",
    minutesSuffix: "分钟",
    resetFilter: "重置",
    matchingDishes: "显示 {count} 道食谱",
    noRecipesInTime: "在此时间范围内未找到食谱。请调整滑块或点击重置。",
    supermarketProduce: "🥦 蔬菜与生鲜水果",
    supermarketMeat: "🥩 生鲜肉类与海鲜",
    supermarketDairy: "🥛 奶制品、黄油与蛋品",
    supermarketBakery: "🥖 烘焙与面包点心",
    supermarketPantry: "🥫 粮油干货与调味品",
    supermarketBeverage: "🧃 饮料水饮与酒水",
    supermarketFrozen: "❄️ 冷冻食品区",
    supermarketHousehold: "🧼 日用品与家庭清洁",
    supermarketOther: "📦 其他杂项",
    accountAndKitchen: "账户与我的厨房",
    termsTitle: "使用条款",
    privacyTitle: "隐私政策",
    supportTitle: "联系支持",
    rateAppTitle: "评价应用",
    termsContent: "欢迎使用 NomNow。使用本应用即表示您同意遵守服务条款，包括合理使用食谱和文明分享家庭厨房数据。",
    privacyContent: "NomNow 致力于保护您的隐私。所有个人数据、账户信息、食谱和菜单均安全存储于 Firebase Firestore，绝不与第三方共享。",
    supportContent: "需要帮助或有功能建议？请联系我们：support@nomnow.app 或热线电话：1900-NOMNOW（每日 8:00 - 22:00）。",
    ratePrompt: "您对 NomNow 的烹饪体验感觉如何？",
    rateThank: "感谢您给出 {stars} 星评价！您的反馈让我们不断进步。",
    autoCategorizeBtn: "⚡ 超市分区自动分类",
    autoReorderRouteBtn: "🔄 按超市动线排序",
    autoCategorizeSuccess: "已将 {count} 种物品按超市分区自动归类！",
    supermarketRouteHint: "🛒 智能超市动线：果蔬 ➔ 肉禽 ➔ 奶制品 ➔ 烘焙 ➔ 粮油调味 ➔ 冷冻区",
    allAisles: "全部分区",
    aisleCompleted: "该分区已全部采购！",
    itemsCheckedRatio: "已采购 {checked}/{total}",
    clearCheckedBtn: "清理已购物品",
    autoDetectedAisle: "⚡ 自动识别区域：",
    autoOption: "⚡ 自动识别超市分区 (推荐)",
    addPlannerToGrocery: "🛒 将每周菜单加入购物清单",
    offlineMode: "离线烹饪模式 (Offline Mode)",
    offlineReadyBadge: "已保存至设备",
    saveOfflineBtn: "保存离线烹饪",
    savedOfflineBtn: "已离线保存",
    offlineNotice: "⚡ 您当前处于离线状态。烹饪步骤已缓存在本地存储，无需网络也可顺利完成烹饪！",
    offlineStorageSuccess: "烹饪步骤已保存至设备，随时可以离线烹饪！",
    offlineStorageRemoved: "已从离线存储中移除该食谱。",
    resumeCookingBanner: "继续烹饪：{title}（第 {step}/{total} 步）",
    continueCookingBtn: "继续烹饪",
    offlineFilterBtn: "💾 离线可用",
    offlineModalTitle: "离线保存的食谱",
    offlineModalDesc: "已保存在您设备中的食谱，无需网络即可随时查阅并烹饪。",
    cookingIngredientsList: "食材清单",
    noOfflineRecipes: "暂无离线食谱。打开任意食谱并点击“保存离线烹饪”即可！",
    load20LunchBtn: "🍱 20道经典午餐"
  }
};

// --- Error Handling ---

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-stone-50 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h1 className="text-2xl font-serif font-bold text-stone-900">Something went wrong</h1>
          <p className="text-stone-500">We encountered an unexpected error. Please try refreshing the page.</p>
          <Button onClick={() => window.location.reload()}>Refresh App</Button>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Components ---

const Button = ({ className, variant = 'primary', ...props }: any) => {
  const variants = {
    primary: 'bg-stone-800 dark:bg-stone-100 text-stone-50 dark:text-stone-900 hover:bg-stone-700 dark:hover:bg-stone-200',
    secondary: 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700',
    outline: 'border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900',
    ghost: 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800',
    danger: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40'
  };
  return (
    <button 
      className={cn(
        'px-4 py-2 rounded-full font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variants[variant as keyof typeof variants],
        className
      )} 
      {...props} 
    />
  );
};

const Card = ({ children, className }: any) => (
  <div className={cn('bg-white dark:bg-stone-900 rounded-3xl p-5 sm:p-6 shadow-sm border border-stone-100 dark:border-stone-800', className)}>
    {children}
  </div>
);

const Modal = ({ isOpen, onClose, title, children }: any) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const mainContent = document.getElementById('main-content');
      if (mainContent) mainContent.setAttribute('aria-hidden', 'true');
      modalRef.current?.focus();
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onCloseRef.current();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        if (mainContent) mainContent.removeAttribute('aria-hidden');
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/50 dark:bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div 
        ref={modalRef}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-stone-50 dark:bg-stone-900 rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl outline-none border border-stone-200 dark:border-stone-800"
      >
        <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex justify-between items-center bg-white dark:bg-stone-900">
          <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-800 dark:text-stone-100">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors cursor-pointer" aria-label="Close">
            <X className="w-6 h-6 text-stone-400" />
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-stone-600 dark:text-stone-300">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const STOCK_RECIPES: Partial<Recipe>[] = [
  ...NEW_LUNCH_20_RECIPES,
  {
    title: "Cơm Tấm Sườn Bì Chả Sài Gòn",
    category: "Lunch",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Lunch", "Traditional", "Rice"],
    winePairing: "Trà đá sả chanh hoặc nước mía tươi mát",
    calories: 650,
    protein: 35,
    fat: 22,
    carbs: 75,
    ingredients: [
      "4 miếng sườn cốt lết heo cắt dày",
      "200g bì heo thái sợi trộn thính",
      "4 quả trứng vịt (làm chả trứng hấp)",
      "500g gạo tấm nấu chín tơi",
      "Nước mắm pha chua ngọt, tỏi ớt băm",
      "Đồ chua (củ cải trắng và cà rốt ngâm giấm)",
      "Hành lá phi mỡ (mỡ hành thơm phức)"
    ],
    instructions: [
      "Ướp sườn cốt lết với nước mắm, mật ong, tỏi băm, sả băm và chút dầu hào trong ít nhất 2 giờ.",
      "Nướng sườn trên than hoa hoặc nồi chiên không dầu ở 190°C trong 18 phút đến khi xém cạnh thơm lừng.",
      "Hấp chả trứng gồm thịt băm, nấm mèo, miến và trứng vịt.",
      "Bày cơm tấm ra đĩa, đặt sườn nướng, cắt miếng bì và chả trứng, thêm đồ chua và rưới mỡ hành lên trên."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Bún Thịt Nướng Chả Giò",
    category: "Lunch",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Lunch", "Noodles", "Grilled"],
    winePairing: "Trà hoa cúc lạnh hoặc nước sâm mía lau",
    calories: 580,
    protein: 28,
    fat: 18,
    carbs: 72,
    ingredients: [
      "400g bún tươi mềm",
      "300g thịt ba chỉ thái mỏng ướp sả nướng",
      "8 chiếc chả giò (nem rán) giòn rụm",
      "Rau sống: xà lách, tía tô, húng quế, giá đỗ",
      "Đậu phộng rang giã dập",
      "Nước mắm chua ngọt ăn kèm"
    ],
    instructions: [
      "Ướp thịt ba chỉ với nước mắm, sả, hành tím băm và chút đường, sau đó nướng vàng thơm.",
      "Rán chả giò vàng giòn đều các mặt.",
      "Xếp bún tươi vào tô cùng rau sống phong phú bên dưới.",
      "Đặt thịt nướng và chả giò lên trên, rắc đậu phộng rang và chan nước mắm chua ngọt."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Bánh Mì Chảo Đậm Đà",
    category: "Lunch",
    rating: 5,
    estimatedTime: 15,
    tags: ["Vietnamese", "Lunch", "Quick", "Street Food"],
    winePairing: "Cà phê sữa đá đậm đà",
    calories: 520,
    protein: 26,
    fat: 22,
    carbs: 54,
    ingredients: [
      "2 quả trứng gà",
      "100g pate gan heo thơm béo",
      "2 viên xíu mại mềm ngon",
      "2 chiếc xúc xích Đức",
      "Sốt cà chua đậm đặc",
      "2 ổ bánh mì nóng giòn",
      "Hành ngò tươi cắt nhỏ"
    ],
    instructions: [
      "Làm nóng chảo gang trên bếp lớn.",
      "Cho pate, xíu mại và sốt cà chua vào đui sôi lăn tăn.",
      "Đập trứng gà ốp la trực tiếp vào chảo bên cạnh.",
      "Thêm xúc xích, rắc hành ngò và ăn kèm bánh mì giòn rụm."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Cơm Gà Hội An Thơm Lừng",
    category: "Lunch",
    rating: 5,
    estimatedTime: 45,
    tags: ["Vietnamese", "Lunch", "Rice", "Specialty"],
    winePairing: "Trà đá chanh tươi",
    calories: 560,
    protein: 34,
    fat: 16,
    carbs: 68,
    ingredients: [
      "1 con gà ta thả vườn (khoảng 1.2kg)",
      "400g gạo tẻ thơm",
      "1 thìa bột nghệ vàng",
      "Hành tây thái mỏng ngâm đá",
      "Rau răm thơm",
      "Nước mắm gừng tỏi ớt"
    ],
    instructions: [
      "Luộc gà chín tới với chút muối và gừng, vớt ra để nguội rồi xé phay.",
      "Vo gạo sạch, dùng nước luộc gà nấu cùng bột nghệ để tạo màu vàng óng và hạt cơm thơm béo.",
      "Trộn thịt gà xé với hành tây, rau răm, nước cốt chanh, muối tiêu.",
      "Xới cơm vàng ra đĩa, đặt gà trộn lên trên và thưởng thức cùng nước mắm gừng."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Phở Xào Bò Cải Ngọt",
    category: "Lunch",
    rating: 5,
    estimatedTime: 20,
    tags: ["Vietnamese", "Lunch", "Stir-fry", "Noodles"],
    winePairing: "Nước mía hoặc nước ngọt có gas",
    calories: 510,
    protein: 29,
    fat: 15,
    carbs: 62,
    ingredients: [
      "400g bánh phở tươi",
      "250g thịt bò phi lê thái mỏng",
      "300g cải ngọt xanh mướt",
      "Tỏi băm, hành tím",
      "Xì dầu, dầu hào, tiêu xay"
    ],
    instructions: [
      "Ướp thịt bò với tỏi băm, dầu hào và chút tiêu trong 15 phút.",
      "Xào nhanh thịt bò trên lửa lớn rồi trút ra đĩa riêng để giữ độ mềm ngọt.",
      "Cho bánh phở vào đảo xém cạnh trên chảo nóng với chút dầu ăn.",
      "Thêm cải ngọt vào xào chín tới, sau đó cho thịt bò vào đảo đều, nêm xì dầu vừa ăn."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Bún Riêu Cua Ốc Thanh Ngọt",
    category: "Lunch",
    rating: 5,
    estimatedTime: 40,
    tags: ["Vietnamese", "Lunch", "Soup", "Seafood"],
    winePairing: "Nước sâm hạt é",
    calories: 490,
    protein: 30,
    fat: 14,
    carbs: 60,
    ingredients: [
      "300g thịt cua đồng xay nhuyễn",
      "200g ốc nhồi làm sạch",
      "4 quả cà chua bổ múi cau",
      "Đậu hũ chiên vàng",
      "Bún tươi, giấm bỗng, hành ngò"
    ],
    instructions: [
      "Lọc nước cua đồng nấu sôi cho riêu cua đóng tảng thành bánh lớn.",
      "Xào ốc nhồi với hành tím và nghệ tươi cho thơm.",
      "Phi hành tỏi xào cà chua rồi đổ vào nồi nước dùng, nêm giấm bỗng tạo vị chua thanh.",
      "Chan nước dùng nóng hổi lên bún, thêm riêu cua, ốc xào và đậu hũ chiên."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Cơm Niêu Cá Kho Tộ Tiêu Sọ",
    category: "Lunch",
    rating: 5,
    estimatedTime: 50,
    tags: ["Vietnamese", "Lunch", "Traditional", "Rice"],
    winePairing: "Trà xanh ấm",
    calories: 540,
    protein: 32,
    fat: 16,
    carbs: 65,
    ingredients: [
      "2 khúc cá lóc (hoặc cá basa tươi)",
      "100g thịt ba chỉ cắt con chì",
      "Nước màu dừa nguyên chất",
      "Tiêu sọ xanh, ớt hiểm",
      "Nước mắm ngon, đường, hành tím"
    ],
    instructions: [
      "Ướp cá và thịt ba chỉ với nước mắm, đường, nước màu và tiêu sọ trong 30 phút.",
      "Xếp thịt và cá vào niêu đất, thêm chút nước và đun lửa lớn đến khi sôi.",
      "Giảm nhỏ lửa riu riu kho đến khi nước sốt keo lại sánh đặc và thịt cá thấm đậm gia vị.",
      "Dọn ăn nóng cùng cơm niêu dẻo thơm."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Bánh Cuốn Nóng Chả Lụa",
    category: "Lunch",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Lunch", "Breakfast", "Light"],
    winePairing: "Nước rau má đậu xanh",
    calories: 430,
    protein: 20,
    fat: 12,
    carbs: 58,
    ingredients: [
      "Bột gạo tráng bánh mỏng",
      "200g thịt heo băm xào mộc nhĩ",
      "Chả lụa (giò lụa) thái miếng",
      "Hành phi giòn rụm",
      "Nước mắm pha nhạt chua ngọt"
    ],
    instructions: [
      "Tráng bột gạo mỏng trên nồi hơi nước nóng, cuộn nhân thịt mộc nhĩ bên trong.",
      "Xếp bánh cuốn ra đĩa, rắc hành phi vàng thơm ngập mặt.",
      "Ăn kèm chả lụa thái miếng và chén nước mắm pha ấm."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Bún Chả Hà Nội Than Hoa",
    category: "Lunch",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Lunch", "Grilled", "Noodles"],
    winePairing: "Trà đá truyền thống",
    calories: 590,
    protein: 33,
    fat: 24,
    carbs: 62,
    ingredients: [
      "300g thịt ba chỉ thái mỏng",
      "200g thịt nạc vai băm viên",
      "Bún tươi, đu đủ xanh, cà rốt",
      "Rau sống: kinh giới, tía tô, xà lách",
      "Nước mắm ấm pha tỏi ớt"
    ],
    instructions: [
      "Ướp thịt ba chỉ và chả viên với nước mắm, hành tỏi băm và mật ong.",
      "Nướng thịt trên bếp than hoa hoặc lò nướng cho xém cạnh thơm phức.",
      "Pha nước mắm chua ngọt ấm, thả đu đủ và cà rốt ngâm giấm.",
      "Dọn bún, thịt nướng thơm lừng cùng tô nước mắm và rau sống tươi mát."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Mì Quảng Gà Tôm Đậm Đà",
    category: "Lunch",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Lunch", "Noodles", "Specialty"],
    winePairing: "Nước chanh leo tươi mát",
    calories: 530,
    protein: 31,
    fat: 15,
    carbs: 64,
    ingredients: [
      "Sợi mì Quảng vàng",
      "200g tôm tươi",
      "200g thịt gà ta xé",
      "Đậu phộng rang, bánh đa nướng",
      "Nước dùng nghệ đậm đà"
    ],
    instructions: [
      "Rim tôm và gà với nghệ tươi, hành tỏi và nước dùng cô đặc.",
      "Trần mì Quảng cho vào tô, chan nước sốt rim đậm đà ngập xâm xấp.",
      "Xếp thịt gà, tôm, rắc đậu phộng rang và bẻ bánh đa ăn kèm."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Cơm Sườn Xào Chua Ngọt",
    category: "Lunch",
    rating: 5,
    estimatedTime: 25,
    tags: ["Vietnamese", "Lunch", "Comfort Food", "Rice"],
    winePairing: "Nước cam vắt tươi",
    calories: 550,
    protein: 28,
    fat: 18,
    carbs: 68,
    ingredients: [
      "400g sườn non chặt miếng vừa ăn",
      "1 quả ớt chuông xanh đỏ",
      "1/4 quả thơm (dứa)",
      "1 củ hành tây",
      "Sốt cà chua, giấm, đường, nước mắm"
    ],
    instructions: [
      "Sườn non chần sơ rồi rán vàng các mặt.",
      "Xào thơm hành tây, ớt chuông và dứa thái miếng.",
      "Cho sườn vào đảo cùng sốt chua ngọt, đun lửa nhỏ đến khi sốt sánh quyện.",
      "Dọn ăn nóng kèm cơm trắng dẻo."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Bánh Xèo Miền Tây Giòn Rụm",
    category: "Lunch",
    rating: 5,
    estimatedTime: 40,
    tags: ["Vietnamese", "Lunch", "Crispy", "Traditional"],
    winePairing: "Nước dừa tươi nguyên chất",
    calories: 580,
    protein: 22,
    fat: 26,
    carbs: 66,
    ingredients: [
      "200g bột bánh xèo hương nghệ",
      "200g tôm tươi và thịt ba chỉ",
      "100g đậu xanh luộc chín",
      "Giá đỗ tươi",
      "Rau sống cuốn bánh tráng, nước mắm tỏi ớt"
    ],
    instructions: [
      "Pha bột bánh xèo với nước cốt dừa và hành lá cắt nhỏ.",
      "Đổ bột mỏng trên chảo nóng, thêm tôm thịt, đậu xanh và giá đỗ, đậy vung cho chín tới rồi gập đôi.",
      "Cuốn bánh xèo giòn rụm với bánh tráng và nhiều rau sống, chấm nước mắm chua ngọt."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Canh Chua Cá Lóc Nam Bộ",
    category: "Dinner",
    rating: 5,
    estimatedTime: 35,
    tags: ["Vietnamese", "Dinner", "Soup", "Traditional"],
    winePairing: "Nước sâm lạnh hoặc trà đá",
    calories: 420,
    protein: 32,
    fat: 12,
    carbs: 45,
    ingredients: [
      "500g cá lóc cắt khúc",
      "1/4 quả dứa (thơm)",
      "2 quả cà chua bổ múi cau",
      "100g dọc mùng (bạc hà)",
      "Đậu bắp, giá đỗ, rau ngổ, mùi tàu",
      "Me chua, tỏi phi"
    ],
    instructions: [
      "Phi thơm tỏi, cho cà chua và dứa vào xào sơ rồi thêm nước nấu sôi.",
      "Cho nước cốt me và cá lóc vào nấu chín tới.",
      "Thêm dọc mùng, đậu bắp, giá đỗ vào đun sôi lại.",
      "Nêm nếm vừa ăn, rắc rau ngổ và mùi tàu thái nhỏ lên trên."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Thịt Kho Tàu Trứng Vịt",
    category: "Dinner",
    rating: 5,
    estimatedTime: 60,
    tags: ["Vietnamese", "Dinner", "Braised", "Traditional"],
    winePairing: "Trà xanh ấm hoặc nước dừa tươi",
    calories: 680,
    protein: 40,
    fat: 38,
    carbs: 35,
    ingredients: [
      "600g thịt ba chỉ cắt khối vuông",
      "5 quả trứng vịt luộc bóc vỏ",
      "Nước dừa tươi nguyên chất",
      "Nước mắm ngon, hành tím, tỏi, ớt"
    ],
    instructions: [
      "Ướp thịt ba chỉ với nước mắm, hành tỏi băm và chút đường trong 30 phút.",
      "Cho thịt vào nồi xào săn, đổ nước dừa tươi ngập mặt thịt.",
      "Thêm trứng vịt luộc vào đun lửa nhỏ liu riu trong 45 phút cho thịt mềm tan và trứng ngấm gia vị."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Canh Sườn Nấu Sấu Rau Rút",
    category: "Dinner",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Dinner", "Soup", "Northern"],
    winePairing: "Nước sâm mía lau",
    calories: 390,
    protein: 26,
    fat: 18,
    carbs: 30,
    ingredients: [
      "400g sườn non chặt khúc",
      "6-8 quả sấu xanh",
      "1 mớ rau rút (nhút) nhặt sạch",
      "Hành tím, nước mắm, muối"
    ],
    instructions: [
      "Xào sơ sườn non với hành tím và chút nước mắm.",
      "Đổ nước vào đun sôi, thả sấu vào ninh nhừ rồi dầm ra lấy vị chua thanh.",
      "Thả rau rút vào đun chín tới rồi tắt bếp."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Đậu Hũ Nhồi Thịt Sốt Cà Chua",
    category: "Dinner",
    rating: 5,
    estimatedTime: 25,
    tags: ["Vietnamese", "Dinner", "Comfort Food", "Home-cooked"],
    winePairing: "Trà đá chanh",
    calories: 480,
    protein: 30,
    fat: 22,
    carbs: 38,
    ingredients: [
      "10 bìa đậu hũ trắng nhỏ",
      "200g thịt heo băm nhuyễn",
      "Nấm mèo, miến cắt nhỏ",
      "3 quả cà chua băm nhỏ",
      "Hành ngò, gia vị"
    ],
    instructions: [
      "Trộn thịt băm với nấm mèo, miến, nước mắm và tiêu.",
      "Nhồi hỗn hợp thịt vào giữa các miếng đậu hũ.",
      "Rán sơ đậu hũ nhồi thịt cho vàng các mặt.",
      "Phi hành tỏi, làm sốt cà chua rồi cho đậu hũ vào om liu riu 10 phút."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Gà Kho Gừng Thơm Lừng",
    category: "Dinner",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Dinner", "Braised", "Spicy"],
    winePairing: "Trà hoa cúc",
    calories: 520,
    protein: 42,
    fat: 20,
    carbs: 25,
    ingredients: [
      "500g thịt gà ta chặt miếng",
      "1 củ gừng lớn thái sợi",
      "Nước mắm, đường, tiêu, ớt",
      "Hành tím băm"
    ],
    instructions: [
      "Phi thơm hành và một nửa số gừng thái sợi.",
      "Cho thịt gà vào xào săn, nêm nước mắm, đường và nước màu.",
      "Cho phần gừng còn lại vào, đun lửa nhỏ đến khi thịt gà thấm gia vị và cạn sền sệt."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Canh Rau Ngót Thịt Băm",
    category: "Dinner",
    rating: 5,
    estimatedTime: 15,
    tags: ["Vietnamese", "Dinner", "Soup", "Healthy"],
    winePairing: "Nước lọc mát",
    calories: 250,
    protein: 18,
    fat: 8,
    carbs: 22,
    ingredients: [
      "1 bó rau ngót tuốt lá vò sơ",
      "150g thịt heo băm",
      "Hành khô, nước mắm, muối"
    ],
    instructions: [
      "Phi thơm hành khô với chút dầu ăn, cho thịt băm vào xào chín tới.",
      "Đổ lượng nước vừa ăn vào đun sôi.",
      "Cho rau ngót vào nấu chín mềm, nêm gia vị vừa ăn rồi tắt bếp."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Mực Xào Dứa Ớt Chuông",
    category: "Dinner",
    rating: 5,
    estimatedTime: 20,
    tags: ["Vietnamese", "Dinner", "Stir-fry", "Seafood"],
    winePairing: "Nước ngọt hoặc soda chanh",
    calories: 380,
    protein: 28,
    fat: 12,
    carbs: 35,
    ingredients: [
      "400g mực tươi làm sạch cắt miếng",
      "1 quả ớt chuông",
      "1/4 quả dứa (thơm)",
      "Hành tây, tỏi băm, hành hoa"
    ],
    instructions: [
      "Chần sơ mực qua nước sôi có gừng để khử mùi tanh.",
      "Phi thơm tỏi, cho mực vào xào lửa lớn rồi trút ra đĩa.",
      "Xào chín tới ớt chuông, dứa và hành tây, sau đó trút mực vào đảo đều, nêm nếm lại."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Canh Khổ Qua Nhồi Thịt",
    category: "Dinner",
    rating: 5,
    estimatedTime: 40,
    tags: ["Vietnamese", "Dinner", "Soup", "Traditional"],
    winePairing: "Trà atiso lạnh",
    calories: 340,
    protein: 25,
    fat: 10,
    carbs: 32,
    ingredients: [
      "4 quả khổ qua (mướp đắng) cắt khúc bỏ ruột",
      "200g thịt heo băm",
      "Nấm mèo, hành lá",
      "Nước dùng xương hoặc nước lọc"
    ],
    instructions: [
      "Trộn thịt băm với nấm mèo băm nhỏ, tiêu và nước mắm.",
      "Nhồi chặt thịt vào giữa các khoanh khổ qua.",
      "Đun sôi nước, cho khổ qua vào ninh nhừ trong 30 phút, nêm gia vị vừa ăn."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Thịt Bò Xào Hành Tây Tiêu Xanh",
    category: "Dinner",
    rating: 5,
    estimatedTime: 20,
    tags: ["Vietnamese", "Dinner", "Stir-fry", "Beef"],
    winePairing: "Trà đá sả",
    calories: 460,
    protein: 35,
    fat: 18,
    carbs: 28,
    ingredients: [
      "350g thịt bò phi lê thái mỏng",
      "1 củ hành tây bổ múi cau",
      "1 nhánh tiêu xanh tươi",
      "Tỏi băm, dầu hào, xì dầu"
    ],
    instructions: [
      "Ướp thịt bò với tỏi băm, dầu hào và chút tiêu trong 15 phút.",
      "Xào nhanh thịt bò trên lửa lớn rồi trút ra đĩa.",
      "Xào sơ hành tây và tiêu xanh, sau đó cho thịt bò vào đảo đều tay rồi tắt bếp."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Cá Biển Sốt Cà Chua Thì Là",
    category: "Dinner",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Dinner", "Fish", "Traditional"],
    winePairing: "Trà đá chanh",
    calories: 410,
    protein: 34,
    fat: 15,
    carbs: 24,
    ingredients: [
      "2 khúc cá thu hoặc cá nục tươi",
      "3 quả cà chua bổ múi cau",
      "1 mớ rau thì lá, hành lá",
      "Nước mắm, hành tím"
    ],
    instructions: [
      "Rán vàng đều hai mặt các khúc cá.",
      "Phi hành tím, xào cà chua cho mềm nhừ thành sốt.",
      "Cho cá vào chảo sốt cà chua, thêm chút nước và om nhỏ lửa 10 phút.",
      "Rắc thì là và hành lá cắt khúc lên trên rồi tắt bếp."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Gà Rán Nước Mắm Tỏi Ớt",
    category: "Dinner",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Dinner", "Fried", "Savory"],
    winePairing: "Nước ngọt có gas",
    calories: 610,
    protein: 45,
    fat: 28,
    carbs: 38,
    ingredients: [
      "500g cánh hoặc đùi gà",
      "Tỏi, ớt băm nhuyễn",
      "Nước mắm ngon, đường, bột bắp"
    ],
    instructions: [
      "Ướp gà với chút muối tiêu, áo qua một lớp mỏng bột bắp rồi rán vàng giòn.",
      "Pha sốt nước mắm, đường, tỏi và ớt băm.",
      "Đun sôi sốt nước mắm rồi cho gà rán vào đảo đều cho sốt bám đều óng ánh."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Canh Bầu Nấu Tôm Tươi",
    category: "Dinner",
    rating: 5,
    estimatedTime: 20,
    tags: ["Vietnamese", "Dinner", "Soup", "Light"],
    winePairing: "Trà hoa cúc",
    calories: 280,
    protein: 20,
    fat: 6,
    carbs: 35,
    ingredients: [
      "1 quả bầu non băm hoặc thái sợi",
      "150g tôm tươi giã dập",
      "Hành tím, hành ngò, nước mắm"
    ],
    instructions: [
      "Phi thơm hành tím, cho tôm tươi vào xào săn thơm.",
      "Đổ lượng nước vừa ăn vào đun sôi.",
      "Cho bầu vào nấu chín tới, nêm gia vị vừa ăn và rắc hành ngò thái nhỏ."
    ],
    imageUrl: "",
    isStock: true
  },
  // --- ĐỒ UỐNG: TRÀ (5 món) ---
  {
    title: "Trà Sen Hồ Tây Truyền Thống",
    category: "Drink",
    rating: 5,
    estimatedTime: 15,
    tags: ["Vietnamese", "Drink", "Trà", "Traditional"],
    winePairing: "Bánh sen hoặc mứt hạt sen",
    calories: 45,
    protein: 1,
    fat: 0,
    carbs: 11,
    ingredients: [
      "10g búp trà xanh Tân Cương hoặc trà mạn ngon",
      "2-3 bông hoa sen Tây Hồ tươi (hoặc ướp gạo sen)",
      "Nước sôi tinh khiết",
      "Đường phèn (tùy thích)"
    ],
    instructions: [
      "Tráng ấm chén bằng nước sôi để giữ nhiệt tốt.",
      "Cho trà vào ấm, rót nước sôi đánh thức trà rồi gạn bỏ nước đầu.",
      "Rót nước sôi chuẩn nhiệt độ (85-90°C) vào hãm trà trong 3-5 phút.",
      "Thưởng thức hương thơm tinh khiết dịu dàng của sen Tây Hồ quyện vị trà đậm đà."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Trà Đào Cam Sả Thơm Mát",
    category: "Drink",
    rating: 5,
    estimatedTime: 20,
    tags: ["Vietnamese", "Drink", "Trà", "Refreshing"],
    winePairing: "Bánh quy bơ",
    calories: 120,
    protein: 1,
    fat: 0,
    carbs: 30,
    ingredients: [
      "2 gói trà túi lọc vị đào hoặc trà đen",
      "3 nhánh sả tươi đập dập",
      "1 quả cam vàng tươi cắt lát",
      "Miếng đào ngâm hộp",
      "Đường cát, đá viên"
    ],
    instructions: [
      "Hãm trà túi lọc với 200ml nước sôi trong 5 phút rồi nhúng bỏ túi trà.",
      "Đun sôi sả với nước để lấy nước cốt thơm lừng.",
      "Pha nước trà, nước sả, nước cốt cam và siro đào cùng đường vừa khẩu vị.",
      "Thêm đá viên, trang trí vài lát cam tươi và miếng đào ngâm lên trên."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Trà Vải Hạt Sen Thanh Mát",
    category: "Drink",
    rating: 5,
    estimatedTime: 25,
    tags: ["Vietnamese", "Drink", "Trà", "Fruit Tea"],
    winePairing: "Bánh ngọt nhẹ",
    calories: 140,
    protein: 2,
    fat: 0,
    carbs: 34,
    ingredients: [
      "2 gói trà đen hoặc trà lài",
      "10 quả vải thiều tươi (hoặc vải ngâm hộp)",
      "50g hạt sen tươi luộc chín",
      "Đường phèn, đá viên"
    ],
    instructions: [
      "Hãm trà lấy nước cốt thơm.",
      "Bóc vỏ vải, bỏ hạt giữ lại cùi trắng.",
      "Hòa nước trà với đường phèn, thả vải thiều và hạt sen vào.",
      "Thêm đá viên và thưởng thức ly trà vải hạt sen giòn ngọt sần sật."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Trà Sữa Ô Long Nướng Trân Châu",
    category: "Drink",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Drink", "Trà", "Milk Tea"],
    winePairing: "Bánh flan",
    calories: 280,
    protein: 5,
    fat: 9,
    carbs: 45,
    ingredients: [
      "30g lá trà ô long nướng",
      "50g sữa bột béo hoặc sữa đặc",
      "100ml sữa tươi không đường",
      "Trân châu đen đã luộc chín",
      "Đá viên"
    ],
    instructions: [
      "Ủ trà ô long nướng với nước sôi trong 8 phút rồi lọc lấy cốt trà đậm.",
      "Khuấy đều sữa đặc và sữa tươi vào cốt trà khi còn ấm.",
      "Cho trân châu vào ly, rót trà sữa ô long thơm ngậy lên trên, thêm đá."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Trà Tắc Mật Ong Gừng Ấm Áp",
    category: "Drink",
    rating: 5,
    estimatedTime: 15,
    tags: ["Vietnamese", "Drink", "Trà", "Warm"],
    winePairing: "Bánh gừng",
    calories: 90,
    protein: 0,
    fat: 0,
    carbs: 23,
    ingredients: [
      "2 túi trà xanh hoặc trà đen",
      "3 quả tắc (quất) vắt lấy nước cốt",
      "2 lát gừng tươi thái mỏng",
      "2 thìa canh mật ong nguyên chất"
    ],
    instructions: [
      "Hãm trà xanh với gừng tươi trong nước sôi khoảng 5 phút.",
      "Để nguội bớt rồi hòa mật ong và nước cốt tắc vào.",
      "Thưởng thức ấm hoặc thêm đá tùy sở thích giúp thanh họng, ấm bụng."
    ],
    imageUrl: "",
    isStock: true
  },

  // --- ĐỒ UỐNG: SINH TỐ (5 món) ---
  {
    title: "Sinh Tố Bơ Sữa Dừa Béo Ngậy",
    category: "Drink",
    rating: 5,
    estimatedTime: 10,
    tags: ["Vietnamese", "Drink", "Sinh tố", "Smoothie"],
    winePairing: "Bánh quy dừa",
    calories: 320,
    protein: 5,
    fat: 18,
    carbs: 38,
    ingredients: [
      "1 quả bơ sáp chín mềm",
      "30ml sữa đặc có đường",
      "50ml nước cốt dừa tươi",
      "100ml sữa tươi",
      "Đá bào"
    ],
    instructions: [
      "Cắt đôi quả bơ, bỏ hạt và nạo lấy phần thịt bơ cho vào máy xay sinh tố.",
      "Thêm sữa đặc, nước cốt dừa, sữa tươi và đá bào vào máy.",
      "Xay nhuyễn mịn hỗn hợp đến khi sánh đặc thì rót ra ly."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Sinh Tố Xoài Sữa Chua Nhiệt Đới",
    category: "Drink",
    rating: 5,
    estimatedTime: 10,
    tags: ["Vietnamese", "Drink", "Sinh tố", "Fruit"],
    winePairing: "Bánh bông lan",
    calories: 220,
    protein: 4,
    fat: 3,
    carbs: 46,
    ingredients: [
      "1 quả xoài cát chín vàng ngọt",
      "1 hộp sữa chua không đường",
      "20ml sữa đặc",
      "Đá viên"
    ],
    instructions: [
      "Gọt vỏ xoài, cắt phần thịt xoài thành khối vuông nhỏ.",
      "Cho xoài, sữa chua, sữa đặc và đá vào máy xay sinh tố.",
      "Xay nhuyễn mịn và rót ra ly, trang trí thêm vài miếng xoài lên trên."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Sinh Tố Mãng Cầu Xiêm Thơm Ngọt",
    category: "Drink",
    rating: 5,
    estimatedTime: 15,
    tags: ["Vietnamese", "Drink", "Sinh tố", "Refreshing"],
    winePairing: "Bánh quy giòn",
    calories: 210,
    protein: 3,
    fat: 2,
    carbs: 48,
    ingredients: [
      "200g thịt mãng cầu xiêm bỏ hạt",
      "30ml sữa đặc",
      "30ml sữa tươi",
      "Đá bào"
    ],
    instructions: [
      "Tách bỏ hạt mãng cầu xiêm cẩn thận.",
      "Cho thịt mãng cầu vào máy xay cùng sữa đặc, sữa tươi và đá bào.",
      "Xay đều đến khi tạo bọt mịn và vị chua ngọt hòa quyện hoàn hảo."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Sinh Tố Chuối Bơ Peanut Butter",
    category: "Drink",
    rating: 5,
    estimatedTime: 10,
    tags: ["Vietnamese", "Drink", "Sinh tố", "Energy"],
    winePairing: "Yến mạch sấy",
    calories: 340,
    protein: 9,
    fat: 14,
    carbs: 48,
    ingredients: [
      "2 quả chuối tiêu chín",
      "1 thìa canh bơ đậu phộng thơm",
      "150ml sữa tươi",
      "1 thìa cà phê mật ong"
    ],
    instructions: [
      "Lột vỏ chuối, cắt khoanh nhỏ.",
      "Cho chuối, bơ đậu phộng, sữa tươi và mật ong vào cối xay.",
      "Xay nhuyễn mịn tạo thành thức uống giàu năng lượng và bổ dưỡng."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Sinh Tố Thanh Long Đỏ Hồng Mát Lạnh",
    category: "Drink",
    rating: 5,
    estimatedTime: 10,
    tags: ["Vietnamese", "Drink", "Sinh tố", "Vibrant"],
    winePairing: "Trái cây tươi",
    calories: 180,
    protein: 3,
    fat: 1,
    carbs: 42,
    ingredients: [
      "1 quả thanh long ruột đỏ (khoảng 250g)",
      "1 hộp sữa chua có đường",
      "20ml sữa đặc",
      "Đá viên"
    ],
    instructions: [
      "Lột vỏ thanh long ruột đỏ, cắt miếng vừa.",
      "Cho thanh long, sữa chua, sữa đặc và đá viên vào máy xay nhuyễn.",
      "Rót ra ly thưởng thức sắc hồng bắt mắt và vị thanh mát tự nhiên."
    ],
    imageUrl: "",
    isStock: true
  },

  // --- ĐỒ UỐNG: GIẢI NHIỆT (5 món) ---
  {
    title: "Nước Sâm Bí Đao Lục Sương Sáo",
    category: "Drink",
    rating: 5,
    estimatedTime: 40,
    tags: ["Vietnamese", "Drink", "Giải nhiệt", "Herbal"],
    winePairing: "Bánh đậu xanh",
    calories: 95,
    protein: 1,
    fat: 0,
    carbs: 24,
    ingredients: [
      "1kg bí đao già phơi khô hoặc tươi thái lát",
      "30g thục địa, lá dứa tươi",
      "Đường phèn vừa đủ",
      "Thạch sương sáo cắt khối nhỏ"
    ],
    instructions: [
      "Rửa sạch bí đao, lá dứa và thục địa.",
      "Đun sôi với 2 lít nước trong 30-40 phút cho ra hết chất ngọt thanh.",
      "Lọc bỏ bã, hòa đường phèn vừa uống rồi để lạnh.",
      "Khi dùng, cho thêm thạch sương sáo thái hạt lựu."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Nước Chanh Muối Mật Ong Giải Khát",
    category: "Drink",
    rating: 5,
    estimatedTime: 10,
    tags: ["Vietnamese", "Drink", "Giải nhiệt", "Citrus"],
    winePairing: "Bánh quy mặn",
    calories: 70,
    protein: 0,
    fat: 0,
    carbs: 18,
    ingredients: [
      "2 quả chanh tươi",
      "2 lát chanh muối lâu năm",
      "2 thìa canh mật ong",
      "Đường phèn, nước ấm và đá viên"
    ],
    instructions: [
      "Dầm nát chanh muối trong ly để lấy vị mặn thơm đặc trưng.",
      "Vắt nước cốt chanh tươi vào, thêm mật ong và chút đường phèn.",
      "Khuấy đều với nước ấm cho tan rồi thêm đá viên giải khát tức thì."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Nước Mủ Trôm Hạt É Hạt Chia",
    category: "Drink",
    rating: 5,
    estimatedTime: 20,
    tags: ["Vietnamese", "Drink", "Giải nhiệt", "Detox"],
    winePairing: "Thạch trái cây",
    calories: 85,
    protein: 2,
    fat: 1,
    carbs: 20,
    ingredients: [
      "10g mủ trôm ngâm nở mềm",
      "1 thìa canh hạt é (hoặc hạt chia)",
      "Đường phèn nấu với lá dứa",
      "Đá viên"
    ],
    instructions: [
      "Ngâm mủ trôm ít nhất 8-10 tiếng cho nở hoàn toàn, rửa sạch.",
      "Ngâm hạt é với nước ấm cho nở đều.",
      "Nấu nước đường phèn lá dứa thơm phức.",
      "Cho mủ trôm, hạt é vào ly, thêm nước đường và đá viên mát rượi."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Nước Rau Má Đậu Xanh Sữa Dừa",
    category: "Drink",
    rating: 5,
    estimatedTime: 30,
    tags: ["Vietnamese", "Drink", "Giải nhiệt", "Healthy"],
    winePairing: "Bánh pía",
    calories: 160,
    protein: 4,
    fat: 5,
    carbs: 26,
    ingredients: [
      "300g rau má tươi nguyên chất",
      "100g đậu xanh không vỏ luộc mềm nhừ",
      "50ml nước cốt dừa",
      "Đường cát trắng, đá bào"
    ],
    instructions: [
      "Rau má rửa sạch, xay nhuyễn với ít nước rồi lọc lấy nước cốt xanh mát.",
      "Xay nhuyễn đậu xanh đã luộc chín mềm.",
      "Hòa nước cốt rau má, đậu xanh nhuyễn, nước cốt dừa và đường.",
      "Thêm đá bào và thưởng thức thức uống giải nhiệt mùa hè cực đỉnh."
    ],
    imageUrl: "",
    isStock: true
  },
  {
    title: "Nước Cam Vắt Mật Ong Tươi Mát",
    category: "Drink",
    rating: 5,
    estimatedTime: 10,
    tags: ["Vietnamese", "Drink", "Giải nhiệt", "Vitamin C"],
    winePairing: "Bánh sandwich",
    calories: 110,
    protein: 2,
    fat: 0,
    carbs: 27,
    ingredients: [
      "3 quả cam vàng hoặc cam sành tươi mọng nước",
      "2 thìa canh mật ong nguyên chất",
      "Đá viên"
    ],
    instructions: [
      "Cắt đôi cam và vắt lấy nước cốt, lọc bỏ hạt.",
      "Khuấy đều nước cam với mật ong để tăng vị ngọt thanh tự nhiên.",
      "Thêm đá viên và trang trí lát cam tươi trên miệng ly."
    ],
    imageUrl: "",
    isStock: true
  }
];

export interface AisleConfig {
  key: string;
  icon: string;
  nameVi: string;
  nameEn: string;
  nameZh: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentBg: string;
  descriptionVi: string;
}

export const SUPERMARKET_AISLE_CONFIG: AisleConfig[] = [
  {
    key: 'Produce',
    icon: '🥦',
    nameVi: 'Rau củ & Trái cây',
    nameEn: 'Produce & Fresh Fruits',
    nameZh: '蔬菜与生鲜水果',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-300 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    accentBg: 'bg-emerald-500/10',
    descriptionVi: 'Rau xanh, hoa quả tươi, củ quả, nấm tươi, hành tỏi ớt tươi'
  },
  {
    key: 'Meat',
    icon: '🥩',
    nameVi: 'Thịt, Thủy hải sản & Trứng',
    nameEn: 'Meat, Seafood & Eggs',
    nameZh: '生鲜肉类、海鲜与蛋品',
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    badgeBorder: 'border-rose-300 dark:border-rose-800',
    badgeText: 'text-rose-800 dark:text-rose-300',
    accentBg: 'bg-rose-500/10',
    descriptionVi: 'Thịt heo, bò, gà, hải sản, tôm, cá, mực, trứng gà vịt'
  },
  {
    key: 'Dairy',
    icon: '🥛',
    nameVi: 'Bơ sữa, Phô mai & Đậu hũ',
    nameEn: 'Dairy, Butter & Tofu',
    nameZh: '奶制品、黄油与豆腐',
    badgeBg: 'bg-sky-100 dark:bg-sky-950/60',
    badgeBorder: 'border-sky-300 dark:border-sky-800',
    badgeText: 'text-sky-800 dark:text-sky-300',
    accentBg: 'bg-sky-500/10',
    descriptionVi: 'Sữa tươi, sữa chua, bơ lạt, phô mai, whipping cream, đậu phụ'
  },
  {
    key: 'Bakery',
    icon: '🥖',
    nameVi: 'Bánh mì & Đồ nướng',
    nameEn: 'Bakery & Bread',
    nameZh: '烘焙与面包点心',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-300 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    accentBg: 'bg-amber-500/10',
    descriptionVi: 'Bánh mì sandwich, baguette, bánh bao, bánh gối, pastry'
  },
  {
    key: 'Pantry',
    icon: '🥫',
    nameVi: 'Đồ khô, Gạo mì & Gia vị',
    nameEn: 'Pantry, Grains & Spices',
    nameZh: '粮油干货与调味品',
    badgeBg: 'bg-yellow-100 dark:bg-yellow-950/60',
    badgeBorder: 'border-yellow-300 dark:border-yellow-800',
    badgeText: 'text-yellow-800 dark:text-yellow-300',
    accentBg: 'bg-yellow-500/10',
    descriptionVi: 'Gạo, mì, miến, bún khô, dầu ăn, nước mắm, tiêu, đường, muối, đồ hộp, nấm khô'
  },
  {
    key: 'Beverage',
    icon: '🧃',
    nameVi: 'Đồ uống & Giải khát',
    nameEn: 'Drinks & Beverages',
    nameZh: '饮料水饮与酒水',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-300 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    accentBg: 'bg-indigo-500/10',
    descriptionVi: 'Nước ngọt, nước khoáng, nước ép, trà chai, bia, rượu'
  },
  {
    key: 'Frozen',
    icon: '❄️',
    nameVi: 'Thực phẩm đông lạnh',
    nameEn: 'Frozen Foods',
    nameZh: '冷冻食品区',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950/60',
    badgeBorder: 'border-cyan-300 dark:border-cyan-800',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    accentBg: 'bg-cyan-500/10',
    descriptionVi: 'Há cảo, chả giò đông lạnh, kem que, kem hộp, đá viên'
  },
  {
    key: 'Household',
    icon: '🧼',
    nameVi: 'Hóa phẩm & Gia dụng',
    nameEn: 'Household & Cleaning',
    nameZh: '日用品与家庭清洁',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-300 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    accentBg: 'bg-purple-500/10',
    descriptionVi: 'Nước rửa chén, bột giặt, túi rác, khăn giấy, màng bọc'
  },
  {
    key: 'Other',
    icon: '📦',
    nameVi: 'Khu vực khác',
    nameEn: 'Other Items',
    nameZh: '其他杂项',
    badgeBg: 'bg-stone-100 dark:bg-stone-800',
    badgeBorder: 'border-stone-300 dark:border-stone-700',
    badgeText: 'text-stone-800 dark:text-stone-300',
    accentBg: 'bg-stone-500/10',
    descriptionVi: 'Các vật dụng hoặc nguyên liệu chưa phân loại'
  }
];

export const SUPERMARKET_AISLES = [
  'Produce',
  'Meat',
  'Dairy',
  'Bakery',
  'Pantry',
  'Beverage',
  'Frozen',
  'Household',
  'Other'
] as const;

export const getAisleInfo = (categoryKey?: string): AisleConfig => {
  const normalized = categoryKey || 'Other';
  const found = SUPERMARKET_AISLE_CONFIG.find(a => a.key.toLowerCase() === normalized.toLowerCase());
  if (found) return found;
  if (['Breakfast', 'Lunch', 'Dinner'].includes(normalized)) {
    return SUPERMARKET_AISLE_CONFIG.find(a => a.key === 'Meat')!;
  }
  if (['Dessert', 'Snack'].includes(normalized)) {
    return SUPERMARKET_AISLE_CONFIG.find(a => a.key === 'Bakery')!;
  }
  if (normalized === 'Drink') {
    return SUPERMARKET_AISLE_CONFIG.find(a => a.key === 'Beverage')!;
  }
  return SUPERMARKET_AISLE_CONFIG.find(a => a.key === 'Other')!;
};

export const classifySupermarketItem = (rawName: string): string => {
  if (!rawName) return 'Other';
  const name = rawName.toLowerCase().trim();

  // 1. Specific Pantry dried goods, dry mushrooms, dried seafood, dry noodles, spices & sauces
  // Check this FIRST so that "nấm hương khô", "mộc nhĩ", "tôm khô", "mực khô", "ớt bột", "hạt tiêu", "hành phi" go to Pantry!
  const pantrySpecificKeywords = [
    'nấm hương khô', 'nấm mèo', 'mộc nhĩ', 'nấm khô', 'tôm khô', 'mực khô', 'cá khô', 'tép khô',
    'khô bò', 'khô gà', 'hành phi', 'tỏi phi', 'hành tím khô', 'hành khô', 'hành khô phi',
    'ớt bột', 'tỏi bột', 'gừng bột', 'sả bột', 'tiêu xay', 'hạt tiêu', 'tiêu đen', 'tiêu sọ', 'tiêu hạt',
    'sa tế', 'bột canh', 'hạt nêm', 'bột ngọt', 'mì chính', 'dầu hào', 'dầu mè', 'dầu ăn',
    'nước tương', 'xì dầu', 'nước mắm', 'mắm tôm', 'mắm tép', 'mắm nêm', 'mắm cá', 'giấm gạo', 'giấm',
    'tương ớt', 'tương cà', 'tương đen', 'tương hột', 'ngũ vị hương', 'hoa hồi', 'quế chi', 'quế',
    'thảo quả', 'hạt dổi', 'mắc khén', 'đậu phộng', 'hạt điều', 'hạt mè', 'mè rang', 'vừng',
    'hạt sen khô', 'táo đỏ', 'kỷ tử', 'đậu xanh', 'đậu đen', 'đậu đỏ', 'đậu trắng', 'đậu nành khô',
    'gạo', 'nếp', 'bún khô', 'miến dong', 'miến', 'phở khô', 'mì gói', 'mì tôm', 'mì ý', 'pasta',
    'spaghetti', 'nui', 'bánh tráng', 'bột mì', 'bột năng', 'bột bắp', 'bột gạo', 'bột nếp',
    'bột chiên giòn', 'bột chiên xù', 'bột nở', 'baking powder', 'baking soda', 'men nở',
    'đường', 'muối', 'đồ hộp', 'cá hộp', 'thịt hộp', 'rong biển khô', 'trà khô', 'chè búp', 'cà phê',
    'bột ca cao', 'socola chip', 'rice', 'flour', 'noodle', 'sugar', 'salt', 'sauce', 'oil',
    'vinegar', 'spice', 'seasoning', 'soy sauce', 'fish sauce', 'beans', 'rice paper', 'canned',
    'black pepper', 'peppercorn', 'dried mushroom', 'dried shrimp',
    '米', '面条', '大米', '面粉', '糖', '盐', '胡椒', '生抽', '老抽', '酱油', '蚝油', '醋', '油', '调料', '花生', '红豆', '绿豆', '木耳', '香菇干', '虾米'
  ];
  if (pantrySpecificKeywords.some(kw => name.includes(kw))) {
    return 'Pantry';
  }

  // 2. Frozen Foods
  const frozenKeywords = [
    'đông lạnh', 'cấp đông', 'kem que', 'kem ly', 'kem hộp', 'đá viên', 'đá lạnh',
    'chả giò đông lạnh', 'há cảo đông lạnh', 'sủi cảo đông lạnh', 'bánh xếp đông lạnh',
    'khoai tây đông lạnh', 'viên thả lẩu', 'tôm đông lạnh', 'cá viên', 'bò viên',
    'frozen', 'ice cream', 'ice', 'popsicle', 'dumpling',
    '速冻', '冰淇淋', '雪糕', '冷冻', '冰块', '饺子'
  ];
  if (frozenKeywords.some(kw => name.includes(kw))) {
    return 'Frozen';
  }

  // 3. Bakery & Bread
  const bakeryKeywords = [
    'bánh mì', 'bánh bao', 'bánh gối', 'bánh sandwich', 'baguette', 'croissant', 'bánh sừng bò',
    'bánh tiêu', 'bánh bông lan', 'bánh ngọt', 'bánh quy', 'toast', 'bread', 'bun', 'pastry', 'bakery', 'pancake', 'waffle',
    '面包', '蛋糕', '法棍', '吐司', '包子', '点心'
  ];
  if (bakeryKeywords.some(kw => name.includes(kw))) {
    return 'Bakery';
  }

  // 4. Beverages & Drinks
  const beverageKeywords = [
    'nước ngọt', 'nước suối', 'nước khoáng', 'nước ép', 'nước tăng lực', 'nước giải khát',
    'nước có ga', 'nước dừa đóng lon', 'coca', 'pepsi', '7up', 'sprite', 'sting', 'redbull',
    'bò húc', 'bia', 'rượu', 'vang', 'cider', 'soda', 'c2', 'o độ', 'beverage', 'drink',
    'beer', 'wine', 'mineral water', 'soft drink', 'juice', 'cola',
    '饮料', '汽水', '可乐', '雪碧', '矿泉水', '果汁', '啤酒', '葡萄酒', '红酒', '白酒'
  ];
  if (beverageKeywords.some(kw => name.includes(kw))) {
    return 'Beverage';
  }

  // 5. Dairy, Chilled, Eggs & Tofu
  const dairyKeywords = [
    'sữa tươi', 'sữa đặc', 'sữa chua', 'yaourt', 'sữa hạt', 'sữa đậu nành', 'sữa',
    'bơ lạt', 'bơ thực vật', 'bơ lợt', 'bơ anchor', 'phô mai', 'pho mát', 'cheese',
    'whipping cream', 'kem béo', 'kem tươi', 'váng sữa', 'đậu phụ', 'đậu hũ', 'tàu hũ',
    'tofu', 'trứng gà', 'trứng vịt', 'trứng cút', 'trứng bắc thảo', 'trứng muối', 'trứng',
    'yogurt', 'butter', 'milk', 'cream', 'curd', 'mozzarella', 'parmesan', 'cheddar', 'condensed milk',
    '牛奶', '酸奶', '奶酪', '黄油', '鲜奶', '炼乳', '豆腐', '豆浆', '鸡蛋', '鸭蛋'
  ];
  if (dairyKeywords.some(kw => name.includes(kw))) {
    return 'Dairy';
  }

  // 6. Fresh Mushrooms & Fresh Herbs (priority before meat's 'gà' for 'nấm đùi gà')
  const freshMushroomAndHerbKeywords = [
    'nấm đùi gà', 'nấm kim châm', 'nấm rơm', 'nấm bào ngư', 'nấm mỡ', 'nấm hải sản', 'nấm linh chi', 'nấm tuyết'
  ];
  if (freshMushroomAndHerbKeywords.some(kw => name.includes(kw))) {
    return 'Produce';
  }

  // 7. Meat & Fresh Seafood
  const meatKeywords = [
    'thịt', 'heo', 'lợn', 'bò', 'gà', 'vịt', 'ngan', 'ngỗng', 'sườn', 'ba chỉ', 'ba rọi', 'cốt lết',
    'nạc dăm', 'nạc thăn', 'thịt xay', 'giò sống', 'bắp bò', 'gân bò', 'nạm bò', 'thăn bò',
    'thịt bê', 'ức gà', 'đùi gà', 'cánh gà', 'chân gà', 'mề gà', 'lòng gà', 'mề', 'lòng', 'gan',
    'cá', 'tôm', 'mực', 'cua', 'ghẹ', 'ốc', 'hàu', 'nghêu', 'ngao', 'sò', 'bạch tuộc', 'hải sản',
    'chả cá', 'giò lụa', 'chả lụa', 'giò thủ', 'xúc xích', 'lạp xưởng', 'dăm bông', 'bacon',
    'pork', 'beef', 'chicken', 'duck', 'meat', 'steak', 'sausage', 'ham', 'seafood', 'fish',
    'shrimp', 'prawn', 'crab', 'squid', 'salmon', 'tuna', 'cá hồi', 'cá lóc', 'cá diêu hồng', 'cá basa',
    'chim', 'bồ câu', 'cá thu', 'cá nục',
    '肉', '牛', '猪', '鸡', '鸭', '鱼', '虾', '蟹', '海鲜', '香肠', '肉末', '排骨'
  ];
  if (meatKeywords.some(kw => name.includes(kw))) {
    return 'Meat';
  }

  // 8. Fresh Produce & Fruits & Fresh Vegetables
  const produceKeywords = [
    'rau', 'củ', 'cà rốt', 'khoai', 'hành lá', 'hành tây', 'hành', 'tỏi', 'ớt', 'gừng', 'sả', 'chanh',
    'quất', 'tắc', 'ngò', 'mùi tàu', 'ngò gai', 'ngò rí', 'thì là', 'dưa leo', 'dưa chuột', 'dưa',
    'cà chua', 'cà tím', 'nấm', 'xoài', 'chuối', 'cam', 'táo', 'lê', 'nho', 'bơ', 'dứa', 'thơm',
    'khóm', 'bắp', 'ngô', 'đậu bắp', 'giá đỗ', 'giá', 'húng', 'diếp cá', 'diếp', 'xà lách',
    'rau thơm', 'bí đỏ', 'bí xanh', 'bí đao', 'bí', 'bầu', 'mướp đắng', 'mướp', 'thảo mộc',
    'bạc hà', 'kinh giới', 'tía tô', 'lá lốt', 'cần tây', 'cần ta', 'măng tây', 'măng chua', 'măng',
    'súp lơ', 'bông cải', 'bắp cải', 'cải thảo', 'cải thìa', 'cải ngọt', 'cải bẹ', 'mồng tơi',
    'rau đay', 'rau muống', 'rau ngót', 'dền', 'khổ qua', 'su su', 'su hào', 'củ dền', 'củ cải',
    'khoai tây', 'khoai lang', 'khoai môn', 'khoai từ', 'sắn', 'củ sắn', 'củ đậu', 'bưởi', 'dưa hấu',
    'dưa lưới', 'thanh long', 'đu đủ', 'ổi', 'nhãn', 'vải', 'mận', 'dâu tây', 'dâu', 'kiwi',
    'chôm chôm', 'măng cụt', 'sầu riêng', 'mít', 'chanh dây', 'việt quất',
    'vegetable', 'fruit', 'herb', 'onion', 'garlic', 'carrot', 'potato', 'tomato', 'lemon',
    'lime', 'chili', 'ginger', 'mushroom', 'lettuce', 'cabbage', 'cucumber', 'apple', 'banana',
    'orange', 'mango', 'avocado', 'spinach', 'mint', 'cilantro', 'scallion', 'shallot',
    '蔬菜', '水果', '葱', '姜', '蒜', '辣椒', '番茄', '西红柿', '土豆', '黄瓜', '胡萝卜', '白菜', '生菜', '苹果', '香蕉'
  ];
  if (produceKeywords.some(kw => name.includes(kw))) {
    return 'Produce';
  }

  // 9. Household & Cleaning
  const householdKeywords = [
    'nước rửa chén', 'xà phòng', 'xà bông', 'nước giặt', 'bột giặt', 'nước lau sàn', 'nước xả',
    'khăn giấy', 'giấy vệ sinh', 'túi rác', 'túi đựng rác', 'màng bọc thực phẩm', 'giấy bạc',
    'bọt biển', 'miếng rửa chén', 'túi zip',
    'soap', 'detergent', 'cleaner', 'sponge', 'tissue', 'paper towel', 'trash bag', 'foil',
    '洗洁精', '洗衣液', '纸巾', '垃圾袋', '保鲜膜', '铝箔纸', '抹布'
  ];
  if (householdKeywords.some(kw => name.includes(kw))) {
    return 'Household';
  }

  // 10. General Pantry fallback
  const generalPantryKeywords = [
    'tiêu', 'hạt', 'gia vị', 'spice', 'sauce', 'oil'
  ];
  if (generalPantryKeywords.some(kw => name.includes(kw))) {
    return 'Pantry';
  }

  return 'Other';
};

export interface OfflineCookingRecipe {
  id?: string;
  title: string;
  category: Category;
  estimatedTime?: number | null;
  rating?: number;
  ingredients: string[];
  instructions: string[];
  notes?: string;
  winePairing?: string;
  savedAt: number;
  savedStep?: number;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
  imageUrl?: string;
}

const OFFLINE_COOKING_STORAGE_KEY = 'nomnow_offline_cooking_recipes_v1';
const ACTIVE_COOKING_SESSION_KEY = 'nomnow_active_cooking_session_v1';

export const getOfflineRecipes = (): OfflineCookingRecipe[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(OFFLINE_COOKING_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading offline recipes:", e);
    return [];
  }
};

export const saveRecipeForOffline = (recipe: Recipe, currentStep: number = 0): boolean => {
  if (typeof window === 'undefined' || !recipe) return false;
  try {
    const existing = getOfflineRecipes();
    const filtered = existing.filter(r => (r.id && recipe.id) ? r.id !== recipe.id : r.title !== recipe.title);
    const itemToSave: OfflineCookingRecipe = {
      id: recipe.id,
      title: recipe.title,
      category: recipe.category,
      estimatedTime: recipe.estimatedTime,
      rating: recipe.rating,
      ingredients: recipe.ingredients || [],
      instructions: recipe.instructions || [],
      notes: recipe.notes,
      winePairing: recipe.winePairing,
      savedAt: Date.now(),
      savedStep: currentStep,
      calories: recipe.calories,
      protein: recipe.protein,
      fat: recipe.fat,
      carbs: recipe.carbs,
      imageUrl: recipe.imageUrl
    };
    filtered.unshift(itemToSave);
    localStorage.setItem(OFFLINE_COOKING_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error("Error saving offline recipe:", e);
    return false;
  }
};

export const removeRecipeFromOffline = (recipeTitleOrId: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const existing = getOfflineRecipes();
    const updated = existing.filter(r => r.id !== recipeTitleOrId && r.title !== recipeTitleOrId);
    localStorage.setItem(OFFLINE_COOKING_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error removing offline recipe:", e);
  }
};

export const isRecipeSavedOffline = (recipe: Recipe | null): boolean => {
  if (!recipe || typeof window === 'undefined') return false;
  const list = getOfflineRecipes();
  return list.some(r => (r.id && recipe.id) ? r.id === recipe.id : r.title === recipe.title);
};

export const getActiveCookingSession = (): { recipe: Recipe; step: number; savedAt: number } | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(ACTIVE_COOKING_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

export const saveActiveCookingSession = (recipe: Recipe, step: number): void => {
  if (typeof window === 'undefined' || !recipe) return;
  try {
    localStorage.setItem(ACTIVE_COOKING_SESSION_KEY, JSON.stringify({
      recipe,
      step,
      savedAt: Date.now()
    }));
  } catch (e) {
    console.error("Error saving active cooking session:", e);
  }
};

export const clearActiveCookingSession = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ACTIVE_COOKING_SESSION_KEY);
  } catch (e) {}
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [householdsLoading, setHouseholdsLoading] = useState(true);
  const [households, setHouseholds] = useState<Household[]>([]);
  const [selectedHousehold, setSelectedHousehold] = useState<Household | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlanItem[]>([]);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const recipeMaintenanceRef = useRef(new Set<string>());
  const [selectedPlannerDay, setSelectedPlannerDay] = useState<string | null>(null);
  const [plannerMealType, setPlannerMealType] = useState<string>('Dinner');
  const [plannerMealTitle, setPlannerMealTitle] = useState<string>('');
  
  const [activeTab, setActiveTab] = useState<'recipes' | 'planner' | 'grocery'>('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedDishType, setSelectedDishType] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedNeed, setSelectedNeed] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [activeChartMetric, setActiveChartMetric] = useState<'calories' | 'macros'>('calories');
  const [activeInfoModal, setActiveInfoModal] = useState<'terms' | 'privacy' | 'support' | null>(null);
  const [userRating, setUserRating] = useState<number>(5);
  const [ratedSubmitted, setRatedSubmitted] = useState<boolean>(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [filterMinTime, setFilterMinTime] = useState<number>(0);
  const [filterMaxTime, setFilterMaxTime] = useState<number>(180);
  const [isTimeFilterOpen, setIsTimeFilterOpen] = useState(true);
  const [isRecipeFilterOpen, setIsRecipeFilterOpen] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [lang, setLang] = useState<'vi' | 'en' | 'zh'>('vi');

  const t = translations[lang];

  const getCategoryLabel = (cat?: Category | string) => {
    switch (cat) {
      case 'Breakfast': return t.breakfast;
      case 'Lunch': return t.lunch;
      case 'Dinner': return t.dinner;
      case 'Dessert': return t.dessert;
      case 'Snack': return t.snack;
      case 'Drink': return t.drink;
      default: return t.other;
    }
  };

  const recipeTranslations: Record<string, { en: { title: string; ingredients: string[]; instructions: string[]; winePairing?: string }, zh: { title: string; ingredients: string[]; instructions: string[]; winePairing?: string } }> = {
    ...NEW_LUNCH_20_TRANSLATIONS,
    "Phở Bò Tái Nạm Truyền Thống": {
      en: {
        title: "Traditional Beef Pho",
        ingredients: ["500g beef brisket and flank", "1kg beef bones", "Rice noodles, onion, cilantro, scallions", "Ginger, star anise, cinnamon, cardamom", "Fish sauce, broth spices"],
        instructions: ["Blanch beef bones and simmer for 6 hours to make clear broth.", "Slice beef brisket and flank thinly.", "Boil rice noodles and place in bowls with beef slices.", "Pour boiling aromatic broth over noodles and garnish with herbs."],
        winePairing: "Iced green tea"
      },
      zh: {
        title: "传统河粉牛肉汤面",
        ingredients: ["500g 牛肉片与牛腩", "1kg 牛骨", "河粉、洋葱、香菜、葱花", "生姜、八角、肉桂、草果", "鱼露、香料"],
        instructions: ["将牛骨焯水并慢炖6小时熬成清汤。", "将牛腩切片。", "将河粉煮熟放入碗中，铺上牛肉片。", "浇入滚热的高汤，撒上香菜即可。"],
        winePairing: "冰绿茶"
      }
    },
    "Bún Chả Hà Nội Than Hoa": {
      en: {
        title: "Hanoi Charcoal Grilled Pork with Rice Noodles",
        ingredients: ["300g sliced pork belly", "200g minced pork patties", "Rice noodles, green papaya, carrots", "Fresh herbs: perilla, lettuce", "Warm fish sauce with garlic and chili"],
        instructions: ["Marinate pork belly and patties with fish sauce, shallots, and honey.", "Grill pork over charcoal until charred and fragrant.", "Prepare warm sweet-and-sour fish sauce with pickled papaya and carrots.", "Serve with rice noodles, grilled pork, and fresh herbs."],
        winePairing: "Traditional iced tea"
      },
      zh: {
        title: "河内炭烤猪肉米线",
        ingredients: ["300g 五花肉片", "200g 猪肉丸", "米线、青木瓜、胡萝卜", "新鲜香草：紫苏、生菜", "大蒜辣椒鱼露汁"],
        instructions: ["将五花肉和肉丸用鱼露、红葱头和蜂蜜腌制。", "在炭火上烤至微焦香气四溢。", "调制酸甜温热鱼露汁，加入木瓜片。", "搭配米线、烤肉和新鲜香草食用。"],
        winePairing: "传统冰茶"
      }
    },
    "Mì Quảng Gà Tôm Đậm Đà": {
      en: {
        title: "Quang Style Noodles with Chicken & Shrimp",
        ingredients: ["Yellow Quang rice noodles", "200g fresh shrimp", "200g shredded free-range chicken", "Roasted peanuts, crispy rice paper", "Rich turmeric broth"],
        instructions: ["Simmer shrimp and chicken with fresh turmeric, shallots, and reduced stock.", "Blanch Quang noodles in a bowl, pour rich simmering sauce over.", "Top with chicken, shrimp, roasted peanuts, and broken rice cracker."],
        winePairing: "Fresh passion fruit juice"
      },
      zh: {
        title: "广南鸡肉鲜虾面",
        ingredients: ["黄广面条", "200g 鲜虾", "200g 撕碎走地鸡肉", "烤花生、脆米饼", "浓郁黄姜高汤"],
        instructions: ["将虾和鸡肉用鲜姜黄、干葱和浓缩高汤焖煮入味。", "广面条焯水入碗，淋上浓郁汤汁。", "放上鸡肉、虾，撒上花生碎和脆饼。"],
        winePairing: "鲜百香果汁"
      }
    },
    "Cơm Sườn Xào Chua Ngọt": {
      en: {
        title: "Sweet and Sour Ribs with Rice",
        ingredients: ["400g pork ribs cut into bite-sized pieces", "1 bell pepper (red and green)", "1/4 pineapple", "1 onion", "Ketchup, vinegar, sugar, fish sauce"],
        instructions: ["Blanch ribs briefly then pan-fry until golden brown.", "Sauté onion, bell pepper, and pineapple chunks.", "Add ribs and sweet-and-sour sauce, simmer until reduced and glossy.", "Serve hot with steamed white rice."],
        winePairing: "Fresh orange juice"
      },
      zh: {
        title: "糖醋排骨饭",
        ingredients: ["400g 排骨（切块）", "1个彩椒（红绿）", "1/4个菠萝", "1个洋葱", "番茄酱、醋、糖、鱼露"],
        instructions: ["排骨焯水后煎至两面金黄。", "翻炒洋葱、彩椒和菠萝块。", "加入排骨与糖醋汁小火收汁至浓郁发亮。", "趁热搭配白米饭食用。"],
        winePairing: "鲜橙汁"
      }
    },
    "Bánh Xèo Miền Tây Giòn Rụm": {
      en: {
        title: "Crispy Southern Vietnamese Sizzling Pancake",
        ingredients: ["200g turmeric rice pancake flour", "200g fresh shrimp and pork belly", "100g boiled mung beans", "Fresh bean sprouts", "Fresh herbs, rice paper, sweet fish sauce"],
        instructions: ["Mix pancake flour with coconut milk and scallions.", "Pour thin batter on a hot skillet, add shrimp, pork, mung beans, and sprouts, cover until cooked then fold.", "Wrap crispy pancake in rice paper with fresh herbs and dip in fish sauce."],
        winePairing: "Fresh coconut water"
      },
      zh: {
        title: "越南南部香脆煎饼",
        ingredients: ["200g 黄姜煎饼粉", "200g 鲜虾和五花肉", "100g 煮熟绿豆", "新鲜豆芽", "香草、米纸、酸甜鱼露"],
        instructions: ["将煎饼粉与椰奶和葱花调匀。", "在热锅中倒入薄面糊，加入虾肉、五花肉、绿豆和豆芽，盖盖煎熟后对折。", "用米纸包着香脆煎饼和大量香草蘸鱼露食用。"],
        winePairing: "鲜椰子水"
      }
    },
    "Canh Chua Cá Lóc Nam Bộ": {
      en: {
        title: "Southern Sour Snakehead Fish Soup",
        ingredients: ["500g snakehead fish (cut into chunks)", "1/4 pineapple", "2 tomatoes (wedges)", "100g elephant ear stems (taro stem)", "Okra, bean sprouts, rice paddy herb, sawtooth coriander", "Tamarind, fried garlic"],
        instructions: ["Sauté garlic, tomatoes, and pineapple, then add water and bring to boil.", "Add tamarind extract and snakehead fish chunks.", "Add elephant ear stems, okra, and bean sprouts, boil again.", "Season to taste and garnish with herbs."],
        winePairing: "Herbal iced tea"
      },
      zh: {
        title: "南部酸鱼汤",
        ingredients: ["500g 鳢鱼（切块）", "1/4个菠萝", "2个西红柿（切角）", "100g 芋茎", "秋葵、豆芽、稻田草、刺芹", "罗望子、炸蒜酥"],
        instructions: ["爆香蒜末，放入西红柿和菠萝翻炒，加水煮沸。", "加入罗望子汁和鱼块煮熟。", "加入芋茎、秋葵和豆芽煮沸。", "调味后撒上香草。"],
        winePairing: "凉茶"
      }
    },
    "Thịt Kho Tàu Trứng Vịt": {
      en: {
        title: "Braised Pork Belly with Duck Eggs",
        ingredients: ["600g pork belly (cubed)", "5 boiled duck eggs", "Coconut water", "Fish sauce, shallots, caramel sauce"],
        instructions: ["Marinate pork belly with fish sauce, shallots, and spices.", "Sauté pork until firm, pour in fresh coconut water and peeled duck eggs.", "Simmer on low heat for 1 hour until tender and deeply flavored.", "Serve hot with steamed rice and pickled mustard greens."],
        winePairing: "Warm green tea"
      },
      zh: {
        title: "椰汁鸭蛋红烧肉",
        ingredients: ["600g 五花肉（切块）", "5个煮熟鸭蛋", "新鲜椰子水", "鱼露、红葱头、焦糖汁"],
        instructions: ["将五花肉用鱼露、红葱头和蜂蜜腌制。", "翻炒五花肉至紧实，倒入新鲜椰子水和剥壳鸭蛋。", "小火慢炖1小时至肉质酥烂入味。", "趁热搭配白米饭和酸菜食用。"],
        winePairing: "温绿茶"
      }
    },
    "Canh Sườn Nấu Sấu Rau Rút": {
      en: {
        title: "Pork Rib Soup with Dracontomelon and Water Dropwort",
        ingredients: ["400g pork ribs", "5-7 sour dracontomelon fruits (quả sấu)", "1 bunch water dropwort (rau rút)", "Shallots, fish sauce, scallions"],
        instructions: ["Simmer pork ribs with water until tender, skimming foam.", "Peel dracontomelon, crush slightly, and add to soup to boil until soft.", "Mash dracontomelon pulp into broth for tart flavor, then add water dropwort.", "Boil briefly, season to taste, and turn off heat."],
        winePairing: "Iced kumquat tea"
      },
      zh: {
        title: "酸果水芹排骨汤",
        ingredients: ["400g 排骨", "5-7个酸果（sấu）", "1把水芹", "红葱头、鱼露、葱花"],
        instructions: ["排骨加水炖煮至软烂并撇去浮沫。", "酸果去皮微压破后放入汤中煮软。", "将酸果肉压融于汤中增添酸爽风味，加入水芹。", "略煮沸后调味出锅。"],
        winePairing: "冰金桔茶"
      }
    },
    "Đậu Hũ Nhồi Thịt Sốt Cà Chua": {
      en: {
        title: "Stuffed Tofu in Tomato Sauce",
        ingredients: ["5 firm tofu blocks", "200g minced pork", "3 ripe tomatoes (diced)", "Wood ear mushrooms, scallions", "Fish sauce, tomato paste"],
        instructions: ["Mix minced pork with soaked wood ear mushrooms, fish sauce, and pepper.", "Cut a slit in each tofu block and stuff with meat mixture, then pan-fry until golden.", "Sauté diced tomatoes into a rich sauce, add stuffed tofu and simmer for 15 minutes.", "Garnish with scallions and serve hot."],
        winePairing: "Iced hibiscus tea"
      },
      zh: {
        title: "茄汁酿豆腐",
        ingredients: ["5块扎实豆腐", "200g 猪肉末", "3个成熟西红柿（切丁）", "木耳、葱花", "鱼露、番茄酱"],
        instructions: ["猪肉末与泡发木耳、鱼露和胡椒粉拌匀。", "豆腐中间切口塞入肉馅，煎至金黄。", "西红柿炒成浓郁酱汁，放入酿豆腐小火焖15分钟。", "撒葱花出锅。"],
        winePairing: "冰洛神花茶"
      }
    },
    "Gà Kho Gừng Thơm Lừng": {
      en: {
        title: "Braised Chicken with Ginger",
        ingredients: ["500g chicken thighs (cut into pieces)", "1 large ginger root (julienned)", "Fish sauce, sugar, shallots", "Chili peppers"],
        instructions: ["Marinate chicken with fish sauce, shallots, and half of the ginger.", "Sauté remaining ginger until fragrant, add chicken and stir-fry until firm.", "Add a little water and simmer on low until chicken is tender and sauce thickens.", "Serve hot with white rice."],
        winePairing: "Warm ginger tea"
      },
      zh: {
        title: "姜汁红烧鸡块",
        ingredients: ["500g 鸡腿肉（切块）", "1大块生姜（切丝）", "鱼露、糖、红葱头", "辣椒"],
        instructions: ["鸡肉用鱼露、红葱头和一半姜丝腌制。", "爆香其余姜丝，放入鸡肉翻炒至紧实。", "加少许水小火焖煮至鸡肉软烂、汤汁浓稠。", "趁热搭配白米饭。"],
        winePairing: "温姜茶"
      }
    },
    "Canh Rau Ngót Thịt Băm": {
      en: {
        title: "Sweet Leaf Soup with Minced Pork",
        ingredients: ["1 bunch Katuk leaves (rau ngót)", "150g minced pork", "Shallots, fish sauce, salt"],
        instructions: ["Strip Katuk leaves and crush slightly by hand.", "Sauté shallots with oil, add minced pork and stir-fry until cooked.", "Pour in appropriate amount of water and bring to boil.", "Add Katuk leaves, cook until tender, season to taste, and serve."],
        winePairing: "Chrysanthemum tea"
      },
      zh: {
        title: "树仔菜肉末汤",
        ingredients: ["1把树仔菜（rau ngót）叶", "150g 猪肉末", "红葱头、鱼露、盐"],
        instructions: ["树仔菜摘叶并用手揉搓变软。", "爆香红葱头，加入肉末炒熟。", "加入适量水煮沸。", "放入树仔菜煮软，调味出锅。"],
        winePairing: "菊花茶"
      }
    },
    "Mực Xào Dứa Ớt Chuông": {
      en: {
        title: "Stir-fried Squid with Pineapple and Bell Pepper",
        ingredients: ["400g fresh squid (cleaned and sliced)", "1 bell pepper", "1/4 pineapple", "Onion, minced garlic, scallions"],
        instructions: ["Blanch squid briefly in boiling ginger water to remove fishiness.", "Sauté garlic, add squid and stir-fry quickly over high heat, then remove.", "Stir-fry bell pepper, pineapple, and onion until tender-crisp, return squid, toss well."],
        winePairing: "Lemon soda"
      },
      zh: {
        title: "菠萝彩椒炒鲜鱿",
        ingredients: ["400g 鲜鱿鱼（洗净切片）", "1个彩椒", "1/4个菠萝", "洋葱、蒜末、葱花"],
        instructions: ["鱿鱼在姜水里快速焯烫去腥。", "爆香蒜末，大火快炒鱿鱼至熟盛出。", "翻炒彩椒、菠萝和洋葱，倒入鱿鱼翻匀调味。"],
        winePairing: "柠檬苏打水"
      }
    },
    "Canh Khổ Qua Nhồi Thịt": {
      en: {
        title: "Stuffed Bitter Melon Soup",
        ingredients: ["4 bitter melons (sliced into rings, deseeded)", "200g minced pork", "Wood ear mushrooms, scallions", "Bone broth or water"],
        instructions: ["Mix minced pork with chopped wood ear mushrooms, pepper, and fish sauce.", "Stuff meat mixture tightly into bitter melon rings.", "Bring water to boil, add stuffed bitter melon and simmer for 30 minutes until tender, season to taste."],
        winePairing: "Chilled artichoke tea"
      },
      zh: {
        title: "苦瓜酿肉汤",
        ingredients: ["4个苦瓜（切段去籽）", "200g 猪肉末", "木耳、葱花", "骨头汤或清水"],
        instructions: ["猪肉末与碎木耳、胡椒粉和鱼露拌匀。", "将肉馅塞紧入苦瓜段中。", "水烧开后放入苦瓜段小火炖30分钟至软烂，调味。"],
        winePairing: "冰镇洋蓟茶"
      }
    },
    "Thịt Bò Xào Hành Tây Tiêu Xanh": {
      en: {
        title: "Stir-fried Beef with Onion and Green Peppercorns",
        ingredients: ["350g beef tenderloin (sliced thin)", "1 onion (wedges)", "1 sprig fresh green peppercorns", "Minced garlic, oyster sauce, soy sauce"],
        instructions: ["Marinate beef with minced garlic, oyster sauce, and pepper for 15 minutes.", "Quickly stir-fry beef over high heat and set aside.", "Sauté onion and green peppercorns, then return beef, toss quickly and turn off heat."],
        winePairing: "Lemongrass iced tea"
      },
      zh: {
        title: "青花椒洋葱炒牛肉",
        ingredients: ["350g 牛里脊肉（切薄片）", "1个洋葱（切角）", "1串新鲜青花椒", "蒜末、蚝油、生抽"],
        instructions: ["牛肉用蒜末、蚝油和胡椒粉腌制15分钟。", "大火快炒牛肉至变色盛出。", "翻炒洋葱和青花椒，倒入牛肉快速翻炒出锅。"],
        winePairing: "香茅冰茶"
      }
    },
    "Cá Biển Sốt Cà Chua Thì Là": {
      en: {
        title: "Sea Fish in Tomato and Dill Sauce",
        ingredients: ["2 Mackerel or scad fish steaks", "3 tomatoes (wedges)", "1 bunch fresh dill, scallions", "Fish sauce, shallots"],
        instructions: ["Pan-fry fish steaks until golden brown on both sides.", "Sauté shallots, cook tomatoes until soft and rich into a sauce.", "Add fish to tomato sauce, add a splash of water and simmer for 10 minutes.", "Garnish with dill and scallions before turning off heat."],
        winePairing: "Lemon iced tea"
      },
      zh: {
        title: "莳萝番茄红烧海鱼",
        ingredients: ["2块海鱼排（马鲛鱼或鲭鱼）", "3个西红柿（切角）", "1把新鲜莳萝、葱花", "鱼露、红葱头"],
        instructions: ["海鱼排两面煎至金黄。", "爆香红葱头，将西红柿炒至软烂成浓酱。", "将鱼放入番茄酱中，加少许水小火焖煮10分钟。", "撒上莳萝和葱花出锅。"],
        winePairing: "柠檬冰茶"
      }
    },
    "Gà Rán Nước Mắm Tỏi Ớt": {
      en: {
        title: "Crispy Fried Chicken in Garlic Fish Sauce",
        ingredients: ["500g chicken wings or drumsticks", "Minced garlic and chili", "Premium fish sauce, sugar, cornstarch"],
        instructions: ["Marinate chicken with salt and pepper, coat with a thin layer of cornstarch and deep fry until crispy golden.", "Prepare sauce with fish sauce, sugar, garlic, and chili.", "Simmer sauce until bubbling, add crispy chicken and toss until evenly glazed."],
        winePairing: "Soft drinks"
      },
      zh: {
        title: "招牌蒜香鱼露炸鸡",
        ingredients: ["500g 鸡翅或鸡腿", "蒜末、辣椒末", "优质鱼露、糖、生粉"],
        instructions: ["鸡肉用盐和胡椒粉腌制，裹上一层薄薄生粉炸至金黄酥脆。", "用鱼露、糖、蒜末和辣椒调制酱汁。", "烧开酱汁后倒入炸鸡翻炒均匀至包裹亮泽。"],
        winePairing: "碳酸饮料"
      }
    },
    "Canh Bầu Nấu Tôm Tươi": {
      en: {
        title: "Bottle Gourd Soup with Fresh Shrimp",
        ingredients: ["1 young bottle gourd (julienned or chopped)", "150g fresh shrimp (crushed)", "Shallots, cilantro, fish sauce"],
        instructions: ["Sauté shallots, add fresh shrimp and stir-fry until fragrant.", "Pour in appropriate amount of water and bring to boil.", "Add bottle gourd, cook until tender, season with fish sauce, and garnish with cilantro."],
        winePairing: "Chrysanthemum tea"
      },
      zh: {
        title: "鲜虾葫芦瓜汤",
        ingredients: ["1个嫩葫芦瓜（切丝或切丁）", "150g 鲜虾（砸碎）", "红葱头、香菜、鱼露"],
        instructions: ["爆香红葱头，加入鲜虾翻炒出香味。", "加入适量水煮沸。", "放入葫芦瓜煮熟，加鱼露调味，撒上香菜。"],
        winePairing: "菊花茶"
      }
    },
    "Trà Sen Hồ Tây Truyền Thống": {
      en: {
        title: "Traditional West Lake Lotus Tea",
        ingredients: ["10g premium green tea buds", "2-3 fresh West Lake lotus flowers", "Pure boiling water", "Rock sugar (optional)"],
        instructions: ["Warm up the teapot with boiling water.", "Rinse tea leaves with hot water and discard.", "Pour water at 85-90°C and steep for 3-5 minutes.", "Enjoy the pure fragrant lotus aroma blended with rich tea flavor."],
        winePairing: "Lotus seed pastry"
      },
      zh: {
        title: "传统西湖莲花茶",
        ingredients: ["10g 优质绿茶芽", "2-3朵新鲜西湖莲花", "纯净沸水", "冰糖（可选）"],
        instructions: ["用沸水温润茶具。", "用热水润茶一次并倒掉。", "注入85-90°C热水冲泡3-5分钟。", "细品纯净淡雅的莲花香与浓郁茶香。"],
        winePairing: "莲子糕"
      }
    },
    "Trà Đào Cam Sả Thơm Mát": {
      en: {
        title: "Peach Orange Lemongrass Tea",
        ingredients: ["2 peach flavored tea bags or black tea", "3 fresh lemongrass stalks (bruised)", "1 fresh valencia orange (sliced)", "Canned peach slices", "Sugar syrup, ice cubes"],
        instructions: ["Steep tea bags in 200ml boiling water for 5 minutes.", "Boil lemongrass with water to extract aromatic essence.", "Mix tea, lemongrass water, orange juice, peach syrup, and sugar.", "Add ice, garnish with fresh orange slices and peaches."],
        winePairing: "Butter cookies"
      },
      zh: {
        title: "香茅鲜橙蜜桃茶",
        ingredients: ["2包桃香红茶或红茶包", "3根鲜香茅（拍碎）", "1个鲜橙（切片）", "罐头桃子片", "糖浆、冰块"],
        instructions: ["茶包用200ml沸水浸泡5分钟。", "香茅加水煮沸提取浓郁香气。", "将茶汤、香茅水、橙汁、蜜桃糖浆和糖混合。", "加冰块，用橙片和桃子装饰。"],
        winePairing: "黄油曲奇"
      }
    },
    "Trà Vải Hạt Sen Thanh Mát": {
      en: {
        title: "Lychee Lotus Seed Tea",
        ingredients: ["2 black tea or jasmine tea bags", "10 fresh lychees (or canned)", "50g fresh lotus seeds (boiled)", "Rock sugar, ice cubes"],
        instructions: ["Brew tea to get aromatic liquid.", "Peel lychees and remove pits.", "Mix tea with rock sugar, add lychees and lotus seeds.", "Add ice cubes and enjoy."],
        winePairing: "Light pastries"
      },
      zh: {
        title: "荔枝莲子清凉茶",
        ingredients: ["2包红茶或茉莉花茶包", "10颗鲜荔枝（或罐头）", "50g 鲜莲子（煮熟）", "冰糖、冰块"],
        instructions: ["冲泡茶汤。", "荔枝去皮去核。", "茶汤加冰糖调味，放入荔枝和莲子。", "加冰块即可享用。"],
        winePairing: "轻乳酪蛋糕"
      }
    },
    "Trà Sữa Ô Long Nướng Trân Châu": {
      en: {
        title: "Roasted Oolong Milk Tea with Pearls",
        ingredients: ["30g roasted oolong tea leaves", "50g creamer or condensed milk", "100ml fresh whole milk", "Cooked black tapioca pearls", "Ice cubes"],
        instructions: ["Steep roasted oolong tea in boiling water for 8 minutes, strain.", "Stir condensed milk and fresh milk into warm tea.", "Place pearls in glass, pour oolong milk tea over, add ice."],
        winePairing: "Flan cake"
      },
      zh: {
        title: "炭焙乌龙珍珠奶茶",
        ingredients: ["30g 炭焙乌龙茶叶", "50g 奶精或炼乳", "100ml 鲜牛奶", "煮熟黑珍珠", "冰块"],
        instructions: ["炭焙乌龙茶用沸水焖泡8分钟过滤。", "将炼乳和鲜牛奶拌入温茶汤中。", "杯中加入珍珠，倒入乌龙奶茶和冰块。"],
        winePairing: "焦糖布丁"
      }
    },
    "Trà Tắc Mật Ong Gừng Ấm Áp": {
      en: {
        title: "Warm Honey Calamondin Ginger Tea",
        ingredients: ["2 green or black tea bags", "3 calamondins (kumquats, juiced)", "2 thin slices fresh ginger", "2 tablespoons raw honey"],
        instructions: ["Brew tea bags with fresh ginger in boiling water for 5 minutes.", "Let cool slightly, then stir in honey and calamondin juice.", "Serve warm or iced to soothe throat and warm stomach."],
        winePairing: "Ginger cookies"
      },
      zh: {
        title: "温润金桔蜂蜜姜茶",
        ingredients: ["2包绿茶或红茶包", "3个小金桔（榨汁）", "2片鲜生姜", "2大勺生蜂蜜"],
        instructions: ["茶包与生姜用沸水冲泡5分钟。", "稍凉后加入蜂蜜和金桔汁。", "温饮或加冰饮用，暖胃润喉。"],
        winePairing: "姜饼干"
      }
    },
    "Sinh Tố Bơ Sữa Dừa Béo Ngậy": {
      en: {
        title: "Creamy Coconut Avocado Smoothie",
        ingredients: ["1 ripe avocado", "30ml sweetened condensed milk", "50ml fresh coconut milk", "100ml fresh milk", "Crushed ice"],
        instructions: ["Cut avocado in half, remove pit, and scoop flesh into blender.", "Add condensed milk, coconut milk, fresh milk, and ice.", "Blend until smooth and creamy, then pour into a glass."],
        winePairing: "Coconut cookies"
      },
      zh: {
        title: "浓郁椰香牛油果冰沙",
        ingredients: ["1个成熟牛油果", "30ml 炼乳", "50ml 鲜椰浆", "100ml 鲜牛奶", "碎冰"],
        instructions: ["牛油果去核取果肉放入搅拌机。", "加入炼乳、椰浆、牛奶和碎冰。", "搅打至细腻顺滑后倒入杯中。"],
        winePairing: "椰香曲奇"
      }
    },
    "Sinh Tố Xoài Sữa Chua Nhiệt Đới": {
      en: {
        title: "Tropical Mango Yogurt Smoothie",
        ingredients: ["1 ripe sweet mango", "1 container plain yogurt", "20ml condensed milk", "Ice cubes"],
        instructions: ["Peel mango and dice flesh.", "Combine mango, yogurt, condensed milk, and ice in blender.", "Blend until smooth and pour into glass, top with mango cubes."],
        winePairing: "Sponge cake"
      },
      zh: {
        title: "热带芒果酸奶冰沙",
        ingredients: ["1个成熟甜芒果", "1盒无糖酸奶", "20ml 炼乳", "冰块"],
        instructions: ["芒果去皮切丁。", "将芒果、酸奶、炼乳和冰块放入搅拌机。", "搅打顺滑后倒入杯中，放芒果丁点缀。"],
        winePairing: "海绵蛋糕"
      }
    },
    "Sinh Tố Mãng Cầu Xiêm Thơm Ngọt": {
      en: {
        title: "Soursop Smoothie",
        ingredients: ["200g soursop flesh (deseeded)", "30ml condensed milk", "30ml fresh milk", "Crushed ice"],
        instructions: ["Carefully remove seeds from soursop.", "Blend soursop flesh with condensed milk, fresh milk, and crushed ice.", "Blend until frothy and well-blended."],
        winePairing: "Crisp crackers"
      },
      zh: {
        title: "香甜刺果番荔枝冰沙",
        ingredients: ["200g 刺果番荔枝果肉（去籽）", "30ml 炼乳", "30ml 鲜牛奶", "碎冰"],
        instructions: ["仔细剔除果肉中的种子。", "将果肉与炼乳、牛奶和碎冰一起搅打。", "打至起泡且质地均匀。"],
        winePairing: "酥脆饼干"
      }
    },
    "Sinh Tố Chuối Bơ Peanut Butter": {
      en: {
        title: "Banana Peanut Butter Energy Smoothie",
        ingredients: ["2 ripe bananas", "1 tbsp creamy peanut butter", "150ml fresh milk", "1 tsp honey"],
        instructions: ["Peel and slice bananas.", "Combine bananas, peanut butter, milk, and honey in blender.", "Blend until smooth for a nutritious energy boost."],
        winePairing: "Granola"
      },
      zh: {
        title: "香蕉花生酱能量冰沙",
        ingredients: ["2根熟香蕉", "1大勺香浓花生酱", "150ml 鲜牛奶", "1小勺蜂蜜"],
        instructions: ["香蕉剥皮切片。", "将香蕉、花生酱、牛奶和蜂蜜放入搅拌机。", "搅打细腻，营养又提神。"],
        winePairing: "燕麦脆片"
      }
    },
    "Sinh Tố Thanh Long Đỏ Hồng Mát Lạnh": {
      en: {
        title: "Vibrant Red Dragon Fruit Smoothie",
        ingredients: ["1 red dragon fruit (approx 250g)", "1 container sweetened yogurt", "20ml condensed milk", "Ice cubes"],
        instructions: ["Peel and chop red dragon fruit.", "Blend dragon fruit, yogurt, condensed milk, and ice cubes.", "Pour into glass and enjoy vibrant color and refreshing taste."],
        winePairing: "Fresh fruits"
      },
      zh: {
        title: "炫红火龙果爽口冰沙",
        ingredients: ["1个红心火龙果（约250g）", "1杯加糖酸奶", "20ml 炼乳", "冰块"],
        instructions: ["火龙果去皮切块。", "将火龙果、酸奶、炼乳和冰块搅打均匀。", "倒入杯中尽享艳丽色彩与清爽口感。"],
        winePairing: "新鲜水果"
      }
    },
    "Nước Sâm Bí Đao Lục Sương Sáo": {
      en: {
        title: "Herbal Winter Melon Drink with Grass Jelly",
        ingredients: ["1kg mature winter melon (sliced)", "30g dried rehmannia root, pandan leaves", "Rock sugar", "Grass jelly cubes"],
        instructions: ["Wash winter melon, pandan leaves, and rehmannia root.", "Simmer with 2 liters of water for 30-40 minutes.", "Strain solids, dissolve rock sugar to taste, and chill.", "Serve with grass jelly cubes on top."],
        winePairing: "Mung bean pastry"
      },
      zh: {
        title: "清凉冬瓜仙草凉茶",
        ingredients: ["1kg 成熟冬瓜（切片）", "30g 生地黄、斑斓叶", "冰糖", "仙草冻块"],
        instructions: ["洗净冬瓜、斑斓叶和生地黄。", "加2升水慢炖30-40分钟。", "过滤渣滓，加入冰糖调味并冷藏。", "饮用时加入仙草冻。"],
        winePairing: "绿豆糕"
      }
    },
    "Nước Chanh Muối Mật Ong Giải Khát": {
      en: {
        title: "Preserved Lemon Honey Refreshing Drink",
        ingredients: ["2 fresh limes", "2 aged preserved lemon slices", "2 tbsp raw honey", "Rock sugar, warm water, ice cubes"],
        instructions: ["Muddle preserved lemon slices in glass to release salty flavor.", "Add fresh lime juice, honey, and rock sugar.", "Stir with warm water until dissolved, add ice cubes to serve."],
        winePairing: "Salty crackers"
      },
      zh: {
        title: "咸柠檬蜂蜜解暑茶",
        ingredients: ["2个鲜青柠", "2片陈年咸柠檬片", "2大勺生蜂蜜", "冰糖、温水、冰块"],
        instructions: ["在杯中捣碎咸柠檬片释放独特咸香。", "加入青柠汁、蜂蜜和冰糖。", "用温水调匀后加入冰块饮用。"],
        winePairing: "苏打饼干"
      }
    },
    "Nước Mủ Trôm Hạt É Hạt Chia": {
      en: {
        title: "Sterculia Gum with Basil and Chia Seeds",
        ingredients: ["10g sterculia gum (soaked and expanded)", "1 tbsp basil seeds (or chia seeds)", "Rock sugar cooked with pandan leaves", "Ice cubes"],
        instructions: ["Soak sterculia gum for 8-10 hours until expanded, rinse clean.", "Soak basil seeds in warm water until plump.", "Prepare pandan rock sugar syrup.", "Combine gum, seeds, syrup, and ice in a glass."],
        winePairing: "Fruit jelly"
      },
      zh: {
        title: "桃胶罗勒子奇亚籽清凉饮",
        ingredients: ["10g 树胶/胖大海类（泡发）", "1大勺罗勒子（或奇亚籽）", "斑斓叶冰糖水", "冰块"],
        instructions: ["泡发树胶8-10小时至完全膨胀洗净。", "罗勒子温水泡发。", "熬煮斑斓叶冰糖水。", "杯中加入树胶、种子、糖水和冰块。"],
        winePairing: "水果果冻"
      }
    },
    "Nước Rau Má Đậu Xanh Sữa Dừa": {
      en: {
        title: "Pennywort Drink with Mung Bean & Coconut Milk",
        ingredients: ["300g fresh pennywort", "100g peeled mung beans (cooked soft)", "50ml coconut milk", "White sugar, crushed ice"],
        instructions: ["Blend pennywort with water and strain green juice.", "Mash cooked mung beans.", "Mix pennywort juice, mashed mung beans, coconut milk, and sugar.", "Serve over crushed ice for ultimate summer cooling."],
        winePairing: "Mung bean pia cake"
      },
      zh: {
        title: "椰浆绿豆积雪草汁",
        ingredients: ["300g 新鲜积雪草（雷公根）", "100g 去皮绿豆（煮烂）", "50ml 椰浆", "白糖、碎冰"],
        instructions: ["积雪草加水榨汁过滤取绿色汁液。", "将煮熟的绿豆压成泥。", "混合积雪草汁、绿豆泥、椰浆和糖。", "加碎冰饮用，夏日消暑极品。"],
        winePairing: "绿豆饼"
      }
    },
    "Nước Cam Vắt Mật Ong Tươi Mát": {
      en: {
        title: "Fresh Orange Juice with Honey",
        ingredients: ["3 juicy valencia or Valencia oranges", "2 tbsp raw honey", "Ice cubes"],
        instructions: ["Cut oranges in half and juice them, removing seeds.", "Stir fresh orange juice with raw honey for natural sweetness.", "Add ice cubes and garnish with orange slice."],
        winePairing: "Sandwich"
      },
      zh: {
        title: "鲜榨蜂蜜橙汁",
        ingredients: ["3个多汁鲜橙", "2大勺生蜂蜜", "冰块"],
        instructions: ["橙子对半切开榨汁去籽。", "将鲜橙汁与蜂蜜搅拌均匀以增添天然清甜。", "加入冰块，用橙片装饰。"],
        winePairing: "三明治"
      }
    }
  };

  const getLocalizedRecipe = (recipe: Recipe): Recipe => {
    if (lang === 'vi') return recipe;
    const trans = recipeTranslations[recipe.title];
    if (!trans) return recipe;
    const langTrans = trans[lang as 'en' | 'zh'];
    if (!langTrans) return recipe;
    return {
      ...recipe,
      title: langTrans.title,
      ingredients: langTrans.ingredients,
      instructions: langTrans.instructions,
      winePairing: langTrans.winePairing || recipe.winePairing
    };
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isHouseholdModalOpen, setIsHouseholdModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<Recipe | null>(null);
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);
  const [cookingStep, setCookingStep] = useState(0);

  // Offline Mode States
  const [isOnline, setIsOnline] = useState<boolean>(() => typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [offlineRecipes, setOfflineRecipes] = useState<OfflineCookingRecipe[]>(() => getOfflineRecipes());
  const [activeCookingSession, setActiveCookingSession] = useState<{ recipe: Recipe; step: number; savedAt: number } | null>(() => getActiveCookingSession());
  const [showCookingIngredients, setShowCookingIngredients] = useState<boolean>(false);
  const [showOfflineModal, setShowOfflineModal] = useState<boolean>(false);
  const [showOfflineOnly, setShowOfflineOnly] = useState<boolean>(false);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);
  const [isDeleteHouseholdConfirmOpen, setIsDeleteHouseholdConfirmOpen] = useState(false);

  const [importUrl, setImportUrl] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);



  const [recipeFormError, setRecipeFormError] = useState<string | null>(null);
  const [newGroceryName, setNewGroceryName] = useState('');
  const [newGroceryQuantity, setNewGroceryQuantity] = useState('1');
  const [newGroceryCategory, setNewGroceryCategory] = useState('Auto');
  const [selectedGroceryAisle, setSelectedGroceryAisle] = useState<string>('All');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [isCompressingImage, setIsCompressingImage] = useState(false);
  const [imageSizeKb, setImageSizeKb] = useState<number | null>(null);
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  const [editingGroceryId, setEditingGroceryId] = useState<string | null>(null);
  const [editingGroceryName, setEditingGroceryName] = useState<string>('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [recipeToPrint, setRecipeToPrint] = useState<Recipe | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [draggedGroceryId, setDraggedGroceryId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCookingListening, setIsCookingListening] = useState(false);
  const [cookingTimerSeconds, setCookingTimerSeconds] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && cookingTimerSeconds !== null && cookingTimerSeconds > 0) {
      interval = setInterval(() => {
        setCookingTimerSeconds(prev => {
          if (prev === null || prev <= 1) {
            setIsTimerRunning(false);
            speakStep("Hẹn giờ đã kết thúc!");
            setToastMessage("⏰ Hẹn giờ nấu ăn đã kết thúc!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, cookingTimerSeconds]);

  // Auto-dismiss toast message after 4 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Network online/offline event listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setToastMessage(lang === 'vi' ? "📶 Đã kết nối lại mạng Internet." : lang === 'zh' ? "📶 网络已重新连接。" : "📶 Internet connection restored.");
    };
    const handleOffline = () => {
      setIsOnline(false);
      setToastMessage(lang === 'vi' ? "⚡ Bạn đang ngoại tuyến. Chế độ Nấu ăn Offline Mode đã sẵn sàng!" : lang === 'zh' ? "⚡ 当前离线。离线烹饪模式已就绪！" : "⚡ Offline: Cooking Offline Mode is ready!");
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [lang]);

  // Auto-sync cooking recipe and step progress to localStorage
  useEffect(() => {
    if (cookingRecipe) {
      saveActiveCookingSession(cookingRecipe, cookingStep);
      saveRecipeForOffline(cookingRecipe, cookingStep);
      setOfflineRecipes(getOfflineRecipes());
    }
  }, [cookingRecipe, cookingStep]);

  const startCooking = (recipe: Recipe, initialStep: number = 0) => {
    setCookingRecipe(recipe);
    setCookingStep(initialStep);
    setShowCookingIngredients(false);
    saveActiveCookingSession(recipe, initialStep);
    saveRecipeForOffline(recipe, initialStep);
    setOfflineRecipes(getOfflineRecipes());
    setToastMessage(lang === 'vi' ? "⚡ Đã lưu các bước nấu ăn vào máy (Offline Mode)!" : lang === 'zh' ? "⚡ 已保存烹饪步骤至设备（离线模式）！" : "⚡ Cooking steps cached for Offline Mode!");
  };

  const closeCookingMode = (completed: boolean = false) => {
    if (completed) {
      clearActiveCookingSession();
      setActiveCookingSession(null);
    } else if (cookingRecipe) {
      saveActiveCookingSession(cookingRecipe, cookingStep);
      setActiveCookingSession(getActiveCookingSession());
    }
    setCookingRecipe(null);
    setIsCookingListening(false);
    setIsSpeaking(false);
    setShowCookingIngredients(false);
  };

  const speakStep = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'vi' ? 'vi-VN' : lang === 'zh' ? 'zh-CN' : 'en-US';
      
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        if (lang === 'vi') {
          // Tiếng Việt: Giọng Nữ trung niên, Việt Nam
          const viVoice = voices.find(v => v.lang.includes('vi') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('hoai') || v.name.toLowerCase().includes('linh') || !v.name.toLowerCase().includes('male'))) || voices.find(v => v.lang.includes('vi'));
          if (viVoice) utterance.voice = viVoice;
          utterance.pitch = 0.95; // maturity/middle age tone
        } else if (lang === 'en') {
          // Tiếng Anh: Giọng Nam, hơi trầm
          const enVoice = voices.find(v => v.lang.includes('en') && (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('uk english male'))) || voices.find(v => v.lang.includes('en'));
          if (enVoice) utterance.voice = enVoice;
          utterance.pitch = 0.82; // deeper voice (hơi trầm)
        } else if (lang === 'zh') {
          // Tiếng Trung: Giọng Nữ, vui vẻ
          const zhVoice = voices.find(v => v.lang.includes('zh') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('ting') || v.name.toLowerCase().includes('meijia') || v.name.toLowerCase().includes('yaoyao'))) || voices.find(v => v.lang.includes('zh'));
          if (zhVoice) utterance.voice = zhVoice;
          utterance.pitch = 1.15; // cheerful/higher pitch (vui vẻ)
          utterance.rate = 1.05;
        }
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setToastMessage("Trình duyệt không hỗ trợ đọc giọng nói.");
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleCookingVoiceControl = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setToastMessage("Trình duyệt không hỗ trợ nhận diện giọng nói.");
      return;
    }

    if (isCookingListening) {
      setIsCookingListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'vi' ? 'vi-VN' : lang === 'zh' ? 'zh-CN' : 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => setIsCookingListening(true);
    recognition.onend = () => setIsCookingListening(false);
    recognition.onerror = () => setIsCookingListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
      console.log("Voice command:", transcript);
      if (transcript.includes('tiếp') || transcript.includes('next') || transcript.includes('下一步')) {
        if (cookingRecipe && cookingStep < cookingRecipe.instructions.length - 1) {
          setCookingStep(prev => {
            const nextIdx = prev + 1;
            speakStep(cookingRecipe.instructions[nextIdx]);
            return nextIdx;
          });
        }
      } else if (transcript.includes('quay lại') || transcript.includes('lùi') || transcript.includes('back') || transcript.includes('上一步')) {
        if (cookingRecipe && cookingStep > 0) {
          setCookingStep(prev => {
            const prevIdx = prev - 1;
            speakStep(cookingRecipe.instructions[prevIdx]);
            return prevIdx;
          });
        }
      } else if (transcript.includes('đọc') || transcript.includes('nói') || transcript.includes('read')) {
        if (cookingRecipe) {
          speakStep(cookingRecipe.instructions[cookingStep]);
        }
      } else if (transcript.includes('dừng') || transcript.includes('stop')) {
        stopSpeaking();
        if (isTimerRunning) {
          setIsTimerRunning(false);
          setToastMessage("⏱️ Đã dừng đồng hồ đếm ngược.");
        }
      } else if (transcript.includes('timer') || transcript.includes('hẹn giờ') || transcript.includes('đặt giờ') || transcript.includes('phút') || transcript.includes('minutes')) {
        const match = transcript.match(/\d+/);
        let mins = 5;
        if (match) {
          mins = parseInt(match[0], 10);
        }
        const totalSecs = mins * 60;
        setCookingTimerSeconds(totalSecs);
        setIsTimerRunning(true);
        speakStep(`Đã đặt hẹn giờ ${mins} phút.`);
        setToastMessage(`⏱️ Đã đặt hẹn giờ ${mins} phút!`);
      }
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
    }
  };


  const [showAnalytics, setShowAnalytics] = useState(false);

  const checkedItems = groceryItems.filter(item => item.checked);
  const categorySpending: Record<string, number> = {
    Produce: 0,
    Meat: 0,
    Dairy: 0,
    Bakery: 0,
    Pantry: 0,
    Beverage: 0,
    Frozen: 0,
    Household: 0,
    Other: 0
  };

  const categoryUnitPrices: Record<string, number> = {
    Meat: 12,
    Produce: 6,
    Dairy: 5,
    Bakery: 4,
    Pantry: 8,
    Beverage: 3,
    Frozen: 7,
    Household: 9,
    Other: 7
  };

  checkedItems.forEach(item => {
    const rawCat = item.category || 'Other';
    const cat = SUPERMARKET_AISLES.includes(rawCat as any) ? rawCat : classifySupermarketItem(item.name);
    const unitPrice = categoryUnitPrices[cat] || 7;
    let qty = 1;
    if (item.quantity) {
      const parsed = parseFloat(item.quantity);
      if (!isNaN(parsed) && parsed > 0) qty = parsed;
    }
    categorySpending[cat] = (categorySpending[cat] || 0) + unitPrice * qty;
  });

  const analyticsChartData = Object.keys(categorySpending).map(cat => ({
    category: cat === 'Produce' ? 'Rau củ' :
              cat === 'Meat' ? 'Thịt cá' :
              cat === 'Dairy' ? 'Sữa bơ' :
              cat === 'Bakery' ? 'Bánh mì' :
              cat === 'Pantry' ? 'Đồ khô' :
              cat === 'Beverage' ? 'Đồ uống' :
              cat === 'Frozen' ? 'Đông lạnh' :
              cat === 'Household' ? 'Tiêu dùng' : 'Khác',
    spending: categorySpending[cat],
    count: checkedItems.filter(i => {
      const rawCat = i.category || 'Other';
      const c = SUPERMARKET_AISLES.includes(rawCat as any) ? rawCat : classifySupermarketItem(i.name);
      return c === cat;
    }).length
  })).filter(d => d.spending > 0);

  const totalCheckedSpending = Object.values(categorySpending).reduce((a, b) => a + b, 0);



  const handleVoiceSearch = () => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói (Speech Recognition). Vui lòng dùng Chrome hoặc Safari.");
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = lang === 'vi' ? 'vi-VN' : lang === 'zh' ? 'zh-CN' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition", err);
      setIsListening(false);
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (isAddModalOpen) {
      const initialImg = editingRecipe?.imageUrl || '';
      setFormImageUrl(initialImg);
      setRecipeFormError(null);
      if (initialImg.startsWith('data:image/')) {
        const estKb = Math.round((initialImg.length * 3) / 4096);
        setImageSizeKb(estKb);
        setImageInputMode('upload');
        // If editing a recipe that previously had an oversized image, auto-compress in memory
        if (initialImg.length > 350000) {
          setIsCompressingImage(true);
          compressImage(initialImg, 960, 0.75)
            .then(res => {
              setFormImageUrl(res.dataUrl);
              setImageSizeKb(res.sizeKb);
            })
            .catch(err => console.warn("Auto-compression on modal open error:", err))
            .finally(() => setIsCompressingImage(false));
        }
      } else if (initialImg.startsWith('http')) {
        setImageSizeKb(null);
        setImageInputMode('url');
      } else {
        setImageSizeKb(null);
        setImageInputMode('upload');
      }
    } else {
      setIsCompressingImage(false);
      setImageSizeKb(null);
    }
  }, [isAddModalOpen, editingRecipe]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', u.uid), {
            displayName: u.displayName || 'Bếp Trưởng',
            photoURL: u.photoURL || ''
          });
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Households
  useEffect(() => {
    if (!user) {
      setHouseholdsLoading(false);
      return;
    }
    setHouseholdsLoading(true);
    const q = query(collection(db, 'households'), where(`members.${user.uid}`, 'in', ['admin', 'member', 'viewer']));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const h = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Household));
      setHouseholds(h);
      setHouseholdsLoading(false);
      if (h.length > 0) {
        setSelectedHousehold(prev => {
          if (!prev) return h[0];
          const updated = h.find(hh => hh.id === prev.id);
          return updated || h[0];
        });
      } else {
        setSelectedHousehold(null);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'households');
    });
    return () => unsubscribe();
  }, [user]);

  // Fetch Recipes, Meal Plans, Grocery Items
  useEffect(() => {
    if (!user || !selectedHousehold) {
      setRecipes([]);
      setMealPlans([]);
      setGroceryItems([]);
      return;
    }
    
    const rQuery = query(collection(db, 'recipes'), where('householdId', '==', selectedHousehold.id));
    const unsubRecipes = onSnapshot(rQuery, async (snapshot) => {
      const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Recipe));
      
      const seenTitles = new Map<string, Recipe>();
      const duplicateIds: string[] = [];

      for (const recipe of fetched) {
        const key = (recipe.title || '').trim().toLowerCase();
        if (seenTitles.has(key)) {
          if (recipe.id) duplicateIds.push(recipe.id);
        } else {
          seenTitles.set(key, recipe);
        }
      }

      if (duplicateIds.length > 0 && !recipeMaintenanceRef.current.has(`dedupe:${selectedHousehold.id}`)) {
        recipeMaintenanceRef.current.add(`dedupe:${selectedHousehold.id}`);
        try {
          const batch = writeBatch(db);
          duplicateIds.forEach(dupId => batch.delete(doc(db, 'recipes', dupId)));
          await batch.commit();
        } catch (e) {
          recipeMaintenanceRef.current.delete(`dedupe:${selectedHousehold.id}`);
          console.error("Error cleaning duplicate recipes:", e);
        }
      }

      const uniqueFetched = Array.from(seenTitles.values());

      // Only seed stock recipes once when kitchen is newly created and completely empty
      if (uniqueFetched.length === 0 && selectedHousehold && !selectedHousehold.isStock) {
        try {
          const householdRef = doc(db, 'households', selectedHousehold.id);
          const hSnap = await getDoc(householdRef);
          if (hSnap.exists() && !hSnap.data()?.recipesSeeded && !recipeMaintenanceRef.current.has(`stock:${selectedHousehold.id}`)) {
            recipeMaintenanceRef.current.add(`stock:${selectedHousehold.id}`);
            const batch = writeBatch(db);
            batch.update(householdRef, { recipesSeeded: true });
            for (const stockRecipe of STOCK_RECIPES) {
              const recipeRef = doc(collection(db, 'recipes'));
              batch.set(recipeRef, {
                ...stockRecipe,
                authorId: user.uid,
                householdId: selectedHousehold.id,
                createdAt: serverTimestamp(),
                isFavorite: false
              });
            }
            await batch.commit();
          }
        } catch (seedErr) {
          recipeMaintenanceRef.current.delete(`stock:${selectedHousehold.id}`);
          console.error("Error seeding initial recipes:", seedErr);
        }
      }

      // Auto-ensure the 100 authentic Vietnamese recipes are populated in active household
      if (selectedHousehold && user && !selectedHousehold.isStock) {
        const existingLowerTitles = new Set(uniqueFetched.map(r => r.title.toLowerCase().trim()));
        const missingRecipes = VIETNAM_100_RECIPES.filter(
          nr => nr.title && !existingLowerTitles.has(nr.title.toLowerCase().trim())
        );

        if (missingRecipes.length > 0 && !recipeMaintenanceRef.current.has(`vietnam:${selectedHousehold.id}`)) {
          recipeMaintenanceRef.current.add(`vietnam:${selectedHousehold.id}`);
          try {
            const batch = writeBatch(db);
            for (const nr of missingRecipes) {
              const recipeRef = doc(collection(db, 'recipes'));
              batch.set(recipeRef, {
                ...nr,
                authorId: user.uid,
                householdId: selectedHousehold.id,
                createdAt: serverTimestamp(),
                isFavorite: false
              });
            }
            batch.update(doc(db, 'households', selectedHousehold.id), { vietnamRecipesSeeded: true });
            await batch.commit();
          } catch (err) {
            recipeMaintenanceRef.current.delete(`vietnam:${selectedHousehold.id}`);
            console.error("Error auto-syncing 100 Vietnamese recipes:", err);
          }
        }
      }

      uniqueFetched.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || Date.now();
        const timeB = b.createdAt?.toMillis?.() || Date.now();
        return timeB - timeA;
      });
      setRecipes(uniqueFetched);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'recipes'));

    const mQuery = query(collection(db, 'mealPlans'), where('householdId', '==', selectedHousehold.id));
    const unsubMeals = onSnapshot(mQuery, (snapshot) => {
      const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as MealPlanItem));
      setMealPlans(fetched);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'mealPlans'));

    const gQuery = query(collection(db, 'groceryItems'), where('householdId', '==', selectedHousehold.id));
    const unsubGrocery = onSnapshot(gQuery, (snapshot) => {
      const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as GroceryItem));
      fetched.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setGroceryItems(fetched);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'groceryItems'));

    return () => {
      unsubRecipes();
      unsubMeals();
      unsubGrocery();
    };
  }, [user, selectedHousehold]);

  const handleCreateHousehold = async (name: string) => {
    if (!user) return;
    setIsProcessing(true);
    try {
      const newH = {
        name,
        ownerId: user.uid,
        members: { [user.uid]: 'admin' },
        createdAt: serverTimestamp(),
        recipesSeeded: true
      };
      const docRef = await addDoc(collection(db, 'households'), newH);
      
      for (const recipe of STOCK_RECIPES) {
        await addDoc(collection(db, 'recipes'), {
          ...recipe,
          authorId: user.uid,
          householdId: docRef.id,
          createdAt: serverTimestamp(),
          isFavorite: false
        });
      }

      setSelectedHousehold({ id: docRef.id, ...newH } as Household);
      setIsHouseholdModalOpen(false);
    } catch (error) {
      console.error("Error creating household:", error);
      alert("Failed to create kitchen.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLoad20LunchRecipes = async () => {
    if (!selectedHousehold || !user) return;
    setIsProcessing(true);
    try {
      const existingLowerTitles = new Set(recipes.map(r => r.title.toLowerCase().trim()));
      let addedCount = 0;
      for (const nr of NEW_LUNCH_20_RECIPES) {
        if (nr.title && !existingLowerTitles.has(nr.title.toLowerCase().trim())) {
          await addDoc(collection(db, 'recipes'), {
            ...nr,
            authorId: user.uid,
            householdId: selectedHousehold.id,
            createdAt: serverTimestamp(),
            isFavorite: false
          });
          addedCount++;
        }
      }
      if (addedCount > 0) {
        setToastMessage(lang === 'vi' ? `🍱 Đã nạp thành công ${addedCount} món cơm trưa mới vào Bếp!` :
                        lang === 'zh' ? `🍱 已将 ${addedCount} 道全新午餐菜肴加入厨房！` :
                        `🍱 Loaded ${addedCount} new lunch recipes into your kitchen!`);
      } else {
        setToastMessage(lang === 'vi' ? `🍱 Toàn bộ 20 món cơm trưa đã có sẵn trong danh mục Trưa!` :
                        lang === 'zh' ? `🍱 全部 20 道午餐菜肴已在您的厨房中！` :
                        `🍱 All 20 lunch recipes are already present in your kitchen!`);
      }
    } catch (err) {
      console.error("Error adding lunch recipes:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteHousehold = async (householdId: string) => {
    if (!user) return;
    try {
      const rQuery = query(collection(db, 'recipes'), where('householdId', '==', householdId));
      const rSnapshot = await getDocs(rQuery);
      for (const rDoc of rSnapshot.docs) {
        await deleteDoc(doc(db, 'recipes', rDoc.id));
      }
      await deleteDoc(doc(db, 'households', householdId));
      setIsDeleteHouseholdConfirmOpen(false);
      setIsHouseholdModalOpen(false);
    } catch (error) {
      console.error("Failed to delete kitchen:", error);
    }
  };



  const handleSaveRecipe = async (recipeData: Partial<Recipe>) => {
    if (!user || !selectedHousehold) return;
    
    if (!recipeData.title?.trim()) {
      setRecipeFormError("Vui lòng nhập tên món ăn.");
      return;
    }
    if (!recipeData.ingredients || recipeData.ingredients.length === 0) {
      setRecipeFormError("Vui lòng thêm ít nhất một nguyên liệu.");
      return;
    }
    if (!recipeData.instructions || recipeData.instructions.length === 0) {
      setRecipeFormError("Vui lòng thêm ít nhất một bước thực hiện.");
      return;
    }

    setRecipeFormError(null);

    // Safeguard: Ensure image data is compressed and stays well within Firestore 1MB document limit
    let finalImageUrl = recipeData.imageUrl || '';
    if (finalImageUrl.startsWith('data:image/')) {
      if (finalImageUrl.length > 300000) {
        try {
          const comp = await compressImage(finalImageUrl, 800, 0.7);
          finalImageUrl = comp.dataUrl;
        } catch (e) {
          console.warn("Auto-compression during recipe save:", e);
        }
      }
    }

    let cleanedData = Object.fromEntries(
      Object.entries({ ...recipeData, imageUrl: finalImageUrl }).filter(([_, v]) => v !== undefined)
    );

    // Guard against Firestore 1,048,576 bytes hard document limit
    let estSize = estimateObjectSize(cleanedData);
    if (estSize > 850000 && finalImageUrl.startsWith('data:image/')) {
      try {
        const mini = await compressImage(finalImageUrl, 600, 0.55);
        finalImageUrl = mini.dataUrl;
        cleanedData = Object.fromEntries(
          Object.entries({ ...recipeData, imageUrl: finalImageUrl }).filter(([_, v]) => v !== undefined)
        );
      } catch (e) {
        console.warn("Emergency compression:", e);
      }
    }

    try {
      if (editingRecipe?.id) {
        await updateDoc(doc(db, 'recipes', editingRecipe.id), {
          ...cleanedData,
          updatedAt: serverTimestamp()
        });

        const updatedRecipe = { ...editingRecipe, ...cleanedData } as Recipe;

        // If saved offline, update offline cache as well
        if (isRecipeSavedOffline(editingRecipe)) {
          saveRecipeForOffline(updatedRecipe);
          setOfflineRecipes(getOfflineRecipes());
        }

        const dishTitle = (cleanedData.title as string) || editingRecipe.title;
        setToastMessage(
          lang === 'vi' ? `💾 Đã lưu chỉnh sửa món "${dishTitle}" thành công!` :
          lang === 'zh' ? `💾 已成功保存对“${dishTitle}”的修改！` :
          `💾 Successfully saved changes for "${dishTitle}"!`
        );
      } else {
        await addDoc(collection(db, 'recipes'), {
          ...cleanedData,
          authorId: user.uid,
          householdId: selectedHousehold.id,
          createdAt: serverTimestamp(),
          rating: cleanedData.rating || 5,
          isFavorite: false
        });

        const dishTitle = (cleanedData.title as string) || 'món ăn';
        setToastMessage(
          lang === 'vi' ? `🎉 Đã lưu món mới "${dishTitle}" vào Bếp thành công!` :
          lang === 'zh' ? `🎉 已成功将“${dishTitle}”添加至厨房！` :
          `🎉 Successfully added "${dishTitle}" to your kitchen!`
        );
      }
      setIsAddModalOpen(false);
      setEditingRecipe(null);
    } catch (error: any) {
      console.error("Error saving recipe:", error);
      const isSizeError = 
        error?.message?.includes("exceeds the maximum allowed size") || 
        error?.message?.includes("1,048,576 bytes") ||
        error?.code === 'invalid-argument';

      if (isSizeError) {
        setRecipeFormError(
          lang === 'vi' 
            ? "⚠️ Dung lượng dữ liệu món ăn vượt quá giới hạn 1MB của Firestore. Vui lòng giảm kích thước ảnh hoặc dùng link URL."
            : "⚠️ The recipe size exceeds Firestore's 1MB limit. Please choose a lighter image or paste an image URL."
        );
        setToastMessage(
          lang === 'vi' ? "⚠️ Ảnh quá lớn vượt giới hạn hệ thống. Vui lòng thử lại với ảnh nhẹ hơn." :
          "⚠️ Image is too large. Please use a lighter photo."
        );
      } else {
        setToastMessage(
          lang === 'vi' ? "❌ Có lỗi xảy ra khi lưu món ăn. Vui lòng thử lại." :
          lang === 'zh' ? "❌ 保存菜品时出错，请重试。" :
          "❌ Failed to save recipe. Please try again."
        );
      }
    }
  };

  const handleDeleteRecipe = async (id: string) => {
    try {
      // Optimistically update local state immediately
      setRecipes(prev => prev.filter(r => r.id !== id));
      if (viewingRecipe?.id === id) {
        setViewingRecipe(null);
      }
      setRecipeToDelete(null);
      setIsDeleteConfirmOpen(false);

      // Permanently delete from Firestore
      await deleteDoc(doc(db, 'recipes', id));

      // Remove from meal plans if scheduled
      const matchingPlans = mealPlans.filter(m => m.recipeId === id);
      for (const plan of matchingPlans) {
        if (plan.id) {
          try {
            await deleteDoc(doc(db, 'mealPlans', plan.id));
          } catch (e) {
            console.error("Error removing meal plan for deleted recipe:", e);
          }
        }
      }

      setToastMessage(lang === 'vi' ? "🗑️ Đã xóa món ăn thành công!" : lang === 'zh' ? "🗑️ 已成功删除菜品！" : "🗑️ Recipe deleted successfully!");
    } catch (error) {
      console.error("Delete recipe error:", error);
      handleFirestoreError(error, OperationType.DELETE, `recipes/${id}`);
    }
  };

  const toggleFavorite = async (recipe: Recipe, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!recipe.id) return;
    try {
      await updateDoc(doc(db, 'recipes', recipe.id), {
        isFavorite: !recipe.isFavorite
      });
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  const handleImport = async () => {
    if (!importUrl) return;
    setIsProcessing(true);
    setImportError(null);
    try {
      const extracted = await extractRecipeFromUrl(importUrl);
      const imageUrl = await generateRecipeImage(extracted.title, extracted.category);
      
      setIsImportModalOpen(false);
      setEditingRecipe({
        ...extracted,
        id: '',
        sourceUrl: importUrl,
        imageUrl: imageUrl || '',
        category: (extracted.category as Category) || 'Other',
        authorId: user?.uid || '',
        householdId: selectedHousehold?.id || '',
        createdAt: Timestamp.now()
      } as Recipe);
      setIsAddModalOpen(true);
      setImportUrl('');
    } catch (error) {
      console.error("Import failed:", error);
      setImportError(error instanceof Error ? error.message : "Không thể trích xuất công thức từ URL này.");
    } finally {
      setIsProcessing(false);
    }
  };



  const handleAddGrocery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroceryName.trim() || !selectedHousehold || !user) return;
    try {
      const autoCat = classifySupermarketItem(newGroceryName);
      const chosenCat = (newGroceryCategory && newGroceryCategory !== 'Auto')
        ? newGroceryCategory
        : (autoCat || 'Other');

      await addDoc(collection(db, 'groceryItems'), {
        householdId: selectedHousehold.id,
        name: newGroceryName.trim(),
        quantity: newGroceryQuantity.trim() || '1',
        category: chosenCat,
        checked: false,
        addedBy: user.uid
      });
      setNewGroceryName('');
      setNewGroceryQuantity('1');
      setNewGroceryCategory('Auto');
    } catch (error) {
      console.error("Failed to add grocery", error);
    }
  };

  const toggleGrocery = async (id: string, currentChecked: boolean) => {
    try {
      await updateDoc(doc(db, 'groceryItems', id), {
        checked: !currentChecked
      });
    } catch (error) {
      console.error("Failed to update grocery", error);
    }
  };

  const deleteGrocery = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'groceryItems', id));
    } catch (error) {
      console.error("Failed to delete grocery", error);
    }
  };

  const updateGroceryName = async (id: string, newName: string) => {
    if (!newName.trim()) return;
    try {
      await updateDoc(doc(db, 'groceryItems', id), {
        name: newName.trim()
      });
      setEditingGroceryId(null);
    } catch (error) {
      console.error("Failed to update grocery name", error);
    }
  };

  const updateGroceryQuantity = async (id: string, newQuantity: string) => {
    try {
      await updateDoc(doc(db, 'groceryItems', id), {
        quantity: newQuantity.trim() || '1'
      });
    } catch (error) {
      console.error("Failed to update grocery quantity", error);
    }
  };

  const handleGroceryDragStart = (e: React.DragEvent, id: string) => {
    setDraggedGroceryId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleGroceryDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleGroceryDrop = async (e: React.DragEvent, targetId: string, categoryItems: GroceryItem[]) => {
    e.preventDefault();
    if (!draggedGroceryId || draggedGroceryId === targetId) return;

    const draggedIndex = categoryItems.findIndex(i => i.id === draggedGroceryId);
    const targetIndex = categoryItems.findIndex(i => i.id === targetId);
    if (draggedIndex === -1 || targetIndex === -1) return;

    const updated = [...categoryItems];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, moved);

    try {
      for (let i = 0; i < updated.length; i++) {
        if (updated[i].id) {
          await updateDoc(doc(db, 'groceryItems', updated[i].id!), {
            order: i
          });
        }
      }
    } catch (err) {
      console.error("Failed to reorder grocery items", err);
    }
    setDraggedGroceryId(null);
  };



  const updateGroceryCategory = async (id: string, newCategory: string) => {
    try {
      await updateDoc(doc(db, 'groceryItems', id), {
        category: newCategory
      });
    } catch (err) {
      console.error("Failed to update grocery category", err);
    }
  };

  const clearCheckedGroceries = async () => {
    const checked = groceryItems.filter(i => i.checked);
    if (checked.length === 0) return;
    try {
      for (const item of checked) {
        if (item.id) await deleteDoc(doc(db, 'groceryItems', item.id));
      }
      setToastMessage(lang === 'vi' ? `🗑️ Đã dọn dẹp ${checked.length} món đã mua!` : lang === 'zh' ? `🗑️ 已清除 ${checked.length} 项已购物品！` : `🗑️ Cleared ${checked.length} checked items!`);
    } catch (e) {
      console.error("Failed to clear checked groceries", e);
    }
  };

  const addWeeklyMealPlansToGrocery = async () => {
    if (!selectedHousehold || !user || mealPlans.length === 0) return;
    setIsProcessing(true);
    try {
      let addedTotal = 0;
      for (const plan of mealPlans) {
        let itemsToAdd: string[] = [];
        if (plan.recipeId) {
          const rec = recipes.find(r => r.id === plan.recipeId);
          if (rec && rec.ingredients?.length) {
            itemsToAdd = rec.ingredients;
          }
        }
        if (itemsToAdd.length === 0 && plan.title) {
          const matchedRec = recipes.find(r => r.title.toLowerCase().trim() === plan.title.toLowerCase().trim());
          if (matchedRec && matchedRec.ingredients?.length) {
            itemsToAdd = matchedRec.ingredients;
          } else {
            itemsToAdd = [plan.title];
          }
        }
        for (const ing of itemsToAdd) {
          const cat = classifySupermarketItem(ing);
          await addDoc(collection(db, 'groceryItems'), {
            householdId: selectedHousehold.id,
            name: ing,
            quantity: '1',
            category: cat,
            checked: false,
            addedBy: user.uid
          });
          addedTotal++;
        }
      }
      setToastMessage(lang === 'vi' ? `🛒 Đã tự động thêm và phân loại ${addedTotal} nguyên liệu từ Thực đơn tuần vào Đi chợ!` :
                      lang === 'zh' ? `🛒 已自动将每周菜单的 ${addedTotal} 种食材分类并加入购物清单！` :
                      `🛒 Added and categorized ${addedTotal} ingredients from weekly plan to grocery list!`);
    } catch (e) {
      console.error("Failed to add meal plan ingredients to grocery", e);
    } finally {
      setIsProcessing(false);
    }
  };

  const addAllIngredientsToGrocery = async (recipe: Recipe) => {
    if (!selectedHousehold || !user) return;
    try {
      for (const ing of recipe.ingredients) {
        const supermarketCat = classifySupermarketItem(ing);
        await addDoc(collection(db, 'groceryItems'), {
          householdId: selectedHousehold.id,
          name: ing,
          quantity: '1',
          category: supermarketCat,
          checked: false,
          addedBy: user.uid
        });
      }
      const msg = t.successMealAdded
        .replace('{count}', recipe.ingredients.length.toString())
        .replace('{title}', recipe.title);
      setToastMessage(msg);
    } catch (error) {
      console.error("Failed to add ingredients to grocery", error);
    }
  };

  const getRecipeCookingTime = (r: Recipe): number => {
    if (typeof r.estimatedTime === 'number' && r.estimatedTime > 0) {
      return r.estimatedTime;
    }
    return (r.instructions && r.instructions.length > 0 ? r.instructions.length * 5 : 20);
  };

  const localizedRecipes = recipes.map(getLocalizedRecipe);
  const filteredRecipes = localizedRecipes.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.ingredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesFavorite = !showFavoritesOnly || r.isFavorite;

    const recipeTime = getRecipeCookingTime(r);
    const matchesMinTime = filterMinTime === 0 || recipeTime >= filterMinTime;
    const matchesMaxTime = filterMaxTime >= 180 || recipeTime <= filterMaxTime;
    const matchesTime = matchesMinTime && matchesMaxTime;

    const isOfflineSaved = offlineRecipes.some(off => (off.id && r.id) ? off.id === r.id : off.title === r.title);
    const matchesOffline = !showOfflineOnly || isOfflineSaved;

    let matchesDishType = true;
    if (selectedDishType !== 'All') {
      const text = (r.title + ' ' + (r.tags || []).join(' ') + ' ' + r.ingredients.join(' ')).toLowerCase();
      if (selectedCategory === 'Drink') {
        if (selectedDishType === 'Trà') {
          matchesDishType = text.includes('trà') || text.includes('tea');
        } else if (selectedDishType === 'Sinh tố') {
          matchesDishType = text.includes('sinh tố') || text.includes('nước ép') || text.includes('smoothie');
        } else if (selectedDishType === 'Giải nhiệt') {
          matchesDishType = text.includes('giải nhiệt') || text.includes('mát') || text.includes('sâm') || text.includes('chanh') || text.includes('cam') || text.includes('đá');
        }
      } else {
        if (selectedDishType === 'Chay') {
          matchesDishType = text.includes('chay') || text.includes('đậu hũ') || text.includes('nấm');
        } else if (selectedDishType === 'Thịt') {
          matchesDishType = text.includes('thịt') || text.includes('sườn') || text.includes('gà') || text.includes('bò') || text.includes('heo') || text.includes('chả');
        } else if (selectedDishType === 'Hải Sản') {
          matchesDishType = text.includes('tôm') || text.includes('mực') || text.includes('cá') || text.includes('cua') || text.includes('ốc');
        } else if (selectedDishType === 'Rau/Trái Cây') {
          matchesDishType = text.includes('rau') || text.includes('cải') || text.includes('dứa') || text.includes('dưa') || text.includes('bầu') || text.includes('đồ chua') || text.includes('xoài') || text.includes('trái cây') || text.includes('cam') || text.includes('đậu bắp') || text.includes('giá');
        } else if (selectedDishType === 'Canh') {
          matchesDishType = text.includes('canh') || text.includes('soup') || text.includes('súp');
        } else if (selectedDishType === 'Cơm Nhà') {
          matchesDishType = text.includes('kho') || text.includes('xào') || text.includes('luộc') || text.includes('canh') || text.includes('thịt') || text.includes('cá') || text.includes('tôm') || text.includes('gà') || text.includes('sườn') || text.includes('cơm') || text.includes('món') || text.includes('braised') || text.includes('soup') || text.includes('family') || text.includes('家常') || text.includes('红烧') || text.includes('汤');
        }
      }
    }

    let matchesRegion = true;
    if (selectedRegion !== 'All') {
      const text = (r.title + ' ' + (r.tags || []).join(' ') + ' ' + r.ingredients.join(' ')).toLowerCase();
      if (selectedRegion === 'Miền Bắc') {
        matchesRegion = text.includes('bắc') || text.includes('hà nội') || text.includes('phở') || text.includes('bún chả') || text.includes('nem rán') || text.includes('hải phòng');
      } else if (selectedRegion === 'Miền Trung') {
        matchesRegion = text.includes('trung') || text.includes('huế') || text.includes('bún bò') || text.includes('mì quảng') || text.includes('bánh xèo');
      } else if (selectedRegion === 'Miền Nam') {
        matchesRegion = text.includes('nam') || text.includes('sài gòn') || text.includes('hủ tiếu') || text.includes('cơm tấm') || text.includes('lẩu mắm') || text.includes('kho quẹt');
      } else if (selectedRegion === 'Quốc tế') {
        matchesRegion = text.includes('ý') || text.includes('hàn') || text.includes('nhật') || text.includes('âu') || text.includes('á') || text.includes('pizza') || text.includes('pasta') || text.includes('sushi') || text.includes('kimchi');
      }
    }

    let matchesNeed = true;
    if (selectedNeed !== 'All') {
      const text = (r.title + ' ' + (r.tags || []).join(' ') + ' ' + r.ingredients.join(' ')).toLowerCase();
      if (selectedNeed === 'Cơm gia đình') {
        matchesNeed = text.includes('gia đình') || text.includes('kho') || text.includes('xào') || text.includes('canh') || text.includes('cơm');
      } else if (selectedNeed === 'Ăn nhanh') {
        matchesNeed = text.includes('nhanh') || text.includes('mì') || text.includes('bánh mì') || text.includes('sandwich') || text.includes('trứng');
      } else if (selectedNeed === 'Mang đi học') {
        matchesNeed = text.includes('cơm cuộn') || text.includes('sandwich') || text.includes('bánh mỳ') || text.includes('gimbap') || text.includes('hộp cơm') || text.includes('trứng');
      } else if (selectedNeed === 'Tiệc gia đình') {
        matchesNeed = text.includes('tiệc') || text.includes('lẩu') || text.includes('nướng') || text.includes('gỏi') || text.includes('chả giò');
      }
    }

    let matchesSeason = true;
    if (selectedSeason !== 'All') {
      const text = (r.title + ' ' + (r.tags || []).join(' ') + ' ' + r.ingredients.join(' ')).toLowerCase();
      if (selectedSeason === 'Mùa nóng') {
        matchesSeason = text.includes('giải nhiệt') || text.includes('mát') || text.includes('nộm') || text.includes('gỏi') || text.includes('salad') || text.includes('sinh tố') || text.includes('trà');
      } else if (selectedSeason === 'Mùa lạnh') {
        matchesSeason = text.includes('nóng') || text.includes('hầm') || text.includes('kho') || text.includes('canh') || text.includes('lẩu') || text.includes('súp') || text.includes('cháo');
      } else if (selectedSeason === 'Tết') {
        matchesSeason = text.includes('tết') || text.includes('bánh chưng') || text.includes('thịt đông') || text.includes('dưa hành');
      } else if (selectedSeason === 'Trung thu') {
        matchesSeason = text.includes('trung thu') || text.includes('bánh nướng') || text.includes('bánh dẻo');
      } else if (selectedSeason === 'Cuối tuần') {
        matchesSeason = text.includes('nướng') || text.includes('lẩu') || text.includes('cầu kỳ') || text.includes('đổi vị');
      }
    }

    return matchesSearch && matchesCategory && matchesFavorite && matchesDishType && matchesRegion && matchesNeed && matchesSeason && matchesTime && matchesOffline;
  });

  if (loading || (user && householdsLoading)) {
    return (
      <div className="h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center p-4 font-serif">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-6 p-6 sm:p-8 bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-800"
        >
          <div className="w-16 h-16 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-amber-500/20">
            <NomNowLogo className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">NomNow House</h1>
            <p className="text-stone-500 dark:text-stone-400 text-base leading-relaxed">
              Trợ lý bếp gia đình giúp bạn khám phá và lưu công thức, lên thực đơn tuần, tạo danh sách đi chợ và theo dõi dinh dưỡng trong một nơi.
            </p>
          </div>
          <Button onClick={signIn} className="w-full py-3.5 text-base shadow-lg bg-amber-600 hover:bg-amber-700 text-white rounded-2xl">
            Đăng nhập với Google
          </Button>
        </motion.div>
      </div>
    );
  }

  if (households.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] dark:bg-stone-950 flex flex-col items-center justify-center p-4 font-serif">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-6 p-6 sm:p-8 bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-800"
        >
          <div className="w-16 h-16 bg-amber-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl rotate-3">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">Tạo Căn Bếp Của Bạn</h1>
            <p className="text-stone-500 dark:text-stone-400 text-sm">Đặt tên cho gian bếp hoặc gia đình của bạn để bắt đầu.</p>
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const name = new FormData(e.currentTarget).get('name') as string;
            handleCreateHousehold(name);
          }} className="space-y-4">
            <input 
              name="name" 
              required 
              placeholder="VD: Bếp Của Tôi..." 
              className="w-full px-5 py-3.5 rounded-2xl border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-amber-500/20 outline-none bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm shadow-sm" 
              disabled={isProcessing} 
            />
            <Button type="submit" className="w-full py-3.5 text-base shadow-lg bg-amber-600 hover:bg-amber-700 text-white rounded-2xl" disabled={isProcessing}>
              {isProcessing ? <><Loader2 className="w-4 h-4 animate-spin" /> ...</> : "Tạo Căn Bếp"}
            </Button>
          </form>

          <button onClick={logOut} className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 text-xs font-medium transition-colors cursor-pointer">
            Đăng xuất
          </button>
        </motion.div>
      </div>
    );
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayEnglish = daysOfWeek[new Date().getDay()];
  const todayPlans = mealPlans.filter(m => m.day === todayEnglish);
  let totalCalories = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCarbs = 0;
  todayPlans.forEach(plan => {
    const recipe = recipes.find(r => r.id === plan.recipeId || r.title.toLowerCase() === plan.title.toLowerCase());
    if (recipe) {
      totalCalories += recipe.calories || 0;
      totalProtein += recipe.protein || 0;
      totalFat += recipe.fat || 0;
      totalCarbs += recipe.carbs || 0;
    }
  });

  const weeklyNutritionData = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
    const dayPlans = mealPlans.filter(m => m.day === day);
    let cals = 0, prot = 0, ft = 0, crb = 0;
    dayPlans.forEach(plan => {
      const matchedRecipe = recipes.find(r => r.id === plan.recipeId || r.title.toLowerCase() === plan.title.toLowerCase());
      if (matchedRecipe) {
        cals += matchedRecipe.calories || 450;
        prot += matchedRecipe.protein || 25;
        ft += matchedRecipe.fat || 18;
        crb += matchedRecipe.carbs || 50;
      } else {
        cals += 480;
        prot += 26;
        ft += 16;
        crb += 52;
      }
    });
    const dayLabel = lang === 'vi' ? (day === 'Monday' ? 'Thứ 2' : day === 'Tuesday' ? 'Thứ 3' : day === 'Wednesday' ? 'Thứ 4' : day === 'Thursday' ? 'Thứ 5' : day === 'Friday' ? 'Thứ 6' : day === 'Saturday' ? 'Thứ 7' : 'Chủ Nhật') :
                     lang === 'zh' ? (day === 'Monday' ? '周一' : day === 'Tuesday' ? '周二' : day === 'Wednesday' ? '周三' : day === 'Thursday' ? '周四' : day === 'Friday' ? '周五' : day === 'Saturday' ? '周六' : '周日') : day;
    return {
      day: dayLabel,
      calories: cals,
      protein: Math.round(prot * 10) / 10,
      fat: Math.round(ft * 10) / 10,
      carbs: Math.round(crb * 10) / 10
    };
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#f8f8f5] dark:bg-stone-950 text-stone-800 dark:text-stone-200 font-sans pb-28 transition-colors duration-300">
        <div id="main-content">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-[#f8f8f5]/95 dark:bg-stone-950/95 backdrop-blur-md px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/60 dark:border-stone-800/60">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 flex items-center justify-center">
                <NomNowLogo className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-none">{t.appTitle}</h1>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
                  {t.subtitle.replace('{name}', user.displayName?.split(' ')[0] || 'Chef')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3">
              <div className="flex items-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full px-2.5 py-1 shadow-sm">
                <Globe className="w-3.5 h-3.5 text-amber-600 mr-1 hidden sm:block" />
                <select 
                  value={lang} 
                  onChange={(e) => setLang(e.target.value as any)}
                  className="bg-transparent text-xs font-bold text-stone-700 dark:text-stone-200 outline-none cursor-pointer"
                >
                  <option value="vi">VI</option>
                  <option value="en">EN</option>
                  <option value="zh">中</option>
                </select>
              </div>

              <button 
                type="button"
                onClick={() => setIsDarkMode(prev => !prev)}
                className="p-2 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition-colors text-stone-600 dark:text-stone-300 cursor-pointer flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              <button 
                onClick={() => setIsHouseholdModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500 transition-all shadow-sm cursor-pointer max-w-[120px] sm:max-w-none truncate"
              >
                <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="font-medium text-xs text-stone-700 dark:text-stone-200 truncate">{selectedHousehold?.name || 'Bếp'}</span>
              </button>

              {/* Offline Mode Manager Button */}
              <button
                onClick={() => setShowOfflineModal(true)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all shadow-sm cursor-pointer",
                  !isOnline
                    ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/50 animate-pulse"
                    : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-500"
                )}
                title="Quản lý món ăn đã lưu ngoại tuyến (Offline Mode)"
              >
                {!isOnline ? (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-semibold text-xs text-amber-600 dark:text-amber-400 hidden sm:inline">Offline</span>
                  </>
                ) : (
                  <>
                    <HardDrive className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-medium text-xs hidden sm:inline">Offline ({offlineRecipes.length})</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-stone-800">
                <img src={user.photoURL || ''} referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border border-stone-200 dark:border-stone-800 shadow-sm object-cover" alt="Profile" />
                <button onClick={logOut} className="p-1.5 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition-colors text-stone-500 hover:text-red-500 cursor-pointer hidden sm:block">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Navigation Tabs */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 flex gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
            <button
              onClick={() => setActiveTab('recipes')}
              className={cn(
                "flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-2xl font-serif font-semibold text-sm sm:text-base transition-all cursor-pointer",
                activeTab === 'recipes' 
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20" 
                  : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800"
              )}
            >
              <BookOpen className="w-4 h-4" /> <span>{t.recipeBook}</span> <span className="text-xs opacity-80">({recipes.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={cn(
                "flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-2xl font-serif font-semibold text-sm sm:text-base transition-all cursor-pointer",
                activeTab === 'planner' 
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20" 
                  : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800"
              )}
            >
              <Calendar className="w-4 h-4" /> <span>{t.mealPlanner}</span>
            </button>
            <button
              onClick={() => setActiveTab('grocery')}
              className={cn(
                "flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-2xl font-serif font-semibold text-sm sm:text-base transition-all cursor-pointer",
                activeTab === 'grocery' 
                  ? "bg-amber-600 text-white shadow-md shadow-amber-600/20" 
                  : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800"
              )}
            >
              <ShoppingCart className="w-4 h-4" /> <span>{t.groceryList}</span> <span className="text-xs opacity-80">({groceryItems.filter(i => !i.checked).length})</span>
            </button>
          </div>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            {/* Active Cooking Session Resume Banner */}
            {activeCookingSession && !cookingRecipe && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-600/20 via-amber-500/10 to-stone-900/40 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0 animate-pulse">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">{t.offlineMode}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">
                        💾 {t.offlineReadyBadge}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">
                      {t.resumeCookingBanner
                        .replace('{title}', activeCookingSession.recipe.title)
                        .replace('{step}', (activeCookingSession.step + 1).toString())
                        .replace('{total}', (activeCookingSession.recipe.instructions?.length || 1).toString())}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button
                    onClick={() => {
                      startCooking(activeCookingSession.recipe, activeCookingSession.step);
                    }}
                    className="px-4 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-xl cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t.continueCookingBtn}</span>
                  </Button>
                  <button
                    onClick={() => {
                      clearActiveCookingSession();
                      setActiveCookingSession(null);
                    }}
                    className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs rounded-lg cursor-pointer"
                    title="Đóng phiên nấu dở"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Offline Network Notice Banner */}
            {!isOnline && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <WifiOff className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold block">{t.offlineMode}</span>
                    <span className="text-xs text-amber-300/80">{t.offlineNotice}</span>
                  </div>
                </div>
                <Button
                  onClick={() => setShowOfflineModal(true)}
                  className="px-3.5 py-1.5 text-xs bg-amber-600 hover:bg-amber-700 text-white rounded-xl shrink-0 cursor-pointer"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.offlineModalTitle}</span>
                </Button>
              </div>
            )}

            {activeTab === 'recipes' && (
              <>
                <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50">{t.whatToCook}</h2>
                    <p className="text-stone-500 dark:text-stone-400 text-sm italic">{t.cookDesc}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <Button onClick={() => { setEditingRecipe(null); setIsAddModalOpen(true); }} className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm py-2.5">
                      <Plus className="w-4 h-4" /> {t.addRecipe}
                    </Button>
                  </div>
                </section>

                <section className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <div className="relative w-full flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
                      <input 
                        type="text" 
                        placeholder={t.searchPlaceholder} 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all text-sm sm:text-base shadow-sm text-stone-800 dark:text-stone-100"
                      />
                      <button
                        type="button"
                        onClick={handleVoiceSearch}
                        title="Tìm kiếm bằng giọng nói"
                        className={cn(
                          "absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center",
                          isListening 
                            ? "bg-red-500 text-white animate-pulse shadow-md" 
                            : "text-stone-400 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-stone-800"
                        )}
                      >
                        <Mic className={cn("w-4.5 h-4.5", isListening && "animate-bounce")} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFilterDrawerOpen(prev => !prev)}
                      className={cn(
                        "w-full sm:w-auto px-4 py-3.5 rounded-2xl font-medium text-sm transition-all border flex items-center justify-center gap-2 cursor-pointer shadow-sm shrink-0",
                        (selectedCategory !== 'All' || selectedDishType !== 'All' || showFavoritesOnly || showOfflineOnly || filterMinTime > 0 || filterMaxTime < 180 || isFilterDrawerOpen)
                          ? "bg-amber-600 text-white border-amber-600 shadow-amber-600/20"
                          : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-amber-400"
                      )}
                    >
                      <Filter className="w-4 h-4" />
                      <span>{t.recipeFilterTitle}</span>
                      {((selectedCategory !== 'All' || selectedDishType !== 'All' || showFavoritesOnly || showOfflineOnly || filterMinTime > 0 || filterMaxTime < 180)) && (
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      )}
                    </button>
                  </div>
                  
                  {/* Dropdown / Drawer Panel for Filters */}
                  {isFilterDrawerOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 transition-all z-20 relative"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                            {t.recipeFilterTitle}
                          </h3>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                            {t.matchingDishes.replace('{count}', filteredRecipes.length.toString())}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {((selectedCategory !== 'All' || selectedDishType !== 'All' || selectedRegion !== 'All' || selectedNeed !== 'All' || selectedSeason !== 'All' || showFavoritesOnly || showOfflineOnly || filterMinTime > 0 || filterMaxTime < 180)) && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory('All');
                                setSelectedDishType('All');
                                setSelectedRegion('All');
                                setSelectedNeed('All');
                                setSelectedSeason('All');
                                setShowFavoritesOnly(false);
                                setShowOfflineOnly(false);
                                setFilterMinTime(0);
                                setFilterMaxTime(180);
                              }}
                              className="text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400 flex items-center gap-1 cursor-pointer font-medium px-2 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-lg"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>{t.resetFilter}</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setIsFilterDrawerOpen(false)}
                            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* Favorites, Offline & Category Tabs */}
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            onClick={() => setShowFavoritesOnly(prev => !prev)}
                            className={cn(
                              "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border flex items-center gap-1.5 cursor-pointer",
                              showFavoritesOnly 
                                ? "bg-rose-500 text-white border-rose-500 shadow-sm" 
                                : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-rose-400"
                            )}
                          >
                            <Heart className={cn("w-3.5 h-3.5", showFavoritesOnly && "fill-current")} /> {t.favorites}
                          </button>

                          <button
                            onClick={() => setShowOfflineOnly(prev => !prev)}
                            className={cn(
                              "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border flex items-center gap-1.5 cursor-pointer",
                              showOfflineOnly 
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-sm" 
                                : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-emerald-400"
                            )}
                          >
                            <HardDrive className="w-3.5 h-3.5" />
                            <span>{t.offlineFilterBtn}</span>
                            <span className={cn(
                              "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                              showOfflineOnly ? "bg-white/20 text-white" : "bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300"
                            )}>
                              {offlineRecipes.length}
                            </span>
                          </button>

                          {[
                            { key: 'All', label: t.all },
                            { key: 'Breakfast', label: t.breakfast },
                            { key: 'Lunch', label: t.lunch },
                            { key: 'Dinner', label: t.dinner },
                            { key: 'Dessert', label: t.dessert },
                            { key: 'Snack', label: t.snack },
                            { key: 'Drink', label: t.drink }
                          ].map((cat) => (
                            <button
                              key={cat.key}
                              onClick={() => { setSelectedCategory(cat.key as any); setSelectedDishType('All'); }}
                              className={cn(
                                "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all border cursor-pointer",
                                selectedCategory === cat.key 
                                  ? "bg-stone-800 dark:bg-stone-100 text-stone-50 dark:text-stone-900 border-stone-800 dark:border-stone-100 shadow-sm" 
                                  : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-stone-400"
                              )}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>

                        {/* Classification / Dish Types */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-xs font-bold text-stone-400 mr-1">{t.classification}</span>
                          {(selectedCategory === 'Drink' ? [
                            { key: 'All', label: t.allTypes },
                            { key: 'Trà', label: t.subTea },
                            { key: 'Sinh tố', label: t.subSmoothie },
                            { key: 'Giải nhiệt', label: t.subRefresh }
                          ] : [
                            { key: 'All', label: t.allTypes },
                            { key: 'Chay', label: t.subVeg },
                            { key: 'Thịt', label: t.subMeat },
                            { key: 'Hải Sản', label: t.subSeafood },
                            { key: 'Rau/Trái Cây', label: t.subProduce },
                            { key: 'Canh', label: t.subSoup },
                            { key: 'Cơm Nhà', label: t.subRice }
                          ]).map((type) => (
                            <button
                              key={type.key}
                              onClick={() => setSelectedDishType(type.key)}
                              className={cn(
                                "px-3 py-1.5 rounded-xl text-xs font-medium transition-all border cursor-pointer",
                                selectedDishType === type.key 
                                  ? "bg-amber-600 text-white border-amber-600 shadow-sm" 
                                  : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400"
                              )}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>

                        {/* Region Filter (Vùng miền) */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-xs font-bold text-stone-400 mr-1">{t.regionFilter}</span>
                          {[
                            { key: 'All', label: t.regionAll },
                            { key: 'Miền Bắc', label: t.regionNorth },
                            { key: 'Miền Trung', label: t.regionCentral },
                            { key: 'Miền Nam', label: t.regionSouth },
                            { key: 'Quốc tế', label: t.regionInter }
                          ].map((reg) => (
                            <button
                              key={reg.key}
                              onClick={() => setSelectedRegion(reg.key)}
                              className={cn(
                                "px-3 py-1.5 rounded-xl text-xs font-medium transition-all border cursor-pointer",
                                selectedRegion === reg.key 
                                  ? "bg-amber-600 text-white border-amber-600 shadow-sm" 
                                  : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400"
                              )}
                            >
                              {reg.label}
                            </button>
                          ))}
                        </div>

                        {/* Need Filter (Nhu cầu) */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-xs font-bold text-stone-400 mr-1">{t.needFilter}</span>
                          {[
                            { key: 'All', label: t.needAll },
                            { key: 'Cơm gia đình', label: t.needFamily },
                            { key: 'Ăn nhanh', label: t.needQuick },
                            { key: 'Mang đi học', label: t.needSchool },
                            { key: 'Tiệc gia đình', label: t.needParty }
                          ].map((nd) => (
                            <button
                              key={nd.key}
                              onClick={() => setSelectedNeed(nd.key)}
                              className={cn(
                                "px-3 py-1.5 rounded-xl text-xs font-medium transition-all border cursor-pointer",
                                selectedNeed === nd.key 
                                  ? "bg-amber-600 text-white border-amber-600 shadow-sm" 
                                  : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400"
                              )}
                            >
                              {nd.label}
                            </button>
                          ))}
                        </div>

                        {/* Season & Occasion Filter (Mùa và dịp) */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-xs font-bold text-stone-400 mr-1">{t.seasonFilter}</span>
                          {[
                            { key: 'All', label: t.seasonAll },
                            { key: 'Mùa nóng', label: t.seasonHot },
                            { key: 'Mùa lạnh', label: t.seasonCold },
                            { key: 'Tết', label: t.seasonTet },
                            { key: 'Trung thu', label: t.seasonMidAutumn },
                            { key: 'Cuối tuần', label: t.seasonWeekend }
                          ].map((seas) => (
                            <button
                              key={seas.key}
                              onClick={() => setSelectedSeason(seas.key)}
                              className={cn(
                                "px-3 py-1.5 rounded-xl text-xs font-medium transition-all border cursor-pointer",
                                selectedSeason === seas.key 
                                  ? "bg-amber-600 text-white border-amber-600 shadow-sm" 
                                  : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400"
                              )}
                            >
                              {seas.label}
                            </button>
                          ))}
                        </div>

                        {/* Cooking Time Filter Slider */}
                        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-xs sm:text-sm font-bold text-stone-800 dark:text-stone-200">{t.timeFilter}</span>
                            <span className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                              ({filterMinTime === 0 && filterMaxTime >= 180
                                ? t.allTimes
                                : filterMinTime === 0
                                ? (lang === 'vi' ? `≤ ${filterMaxTime} phút` : lang === 'zh' ? `≤ ${filterMaxTime} 分钟` : `≤ ${filterMaxTime} mins`)
                                : filterMaxTime >= 180
                                ? (lang === 'vi' ? `≥ ${filterMinTime} phút` : lang === 'zh' ? `≥ ${filterMinTime} 分钟` : `≥ ${filterMinTime} mins`)
                                : `${filterMinTime} - ${filterMaxTime} phút`})
                            </span>
                          </div>

                          {/* Quick Preset Buttons */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => { setFilterMinTime(0); setFilterMaxTime(180); }}
                              className={cn(
                                "px-2.5 py-1 rounded-xl text-xs font-medium transition-all border cursor-pointer",
                                filterMinTime === 0 && filterMaxTime >= 180
                                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                                  : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400"
                              )}
                            >
                              {t.allTimes}
                            </button>
                            <button
                              type="button"
                              onClick={() => { setFilterMinTime(0); setFilterMaxTime(20); }}
                              className={cn(
                                "px-2.5 py-1 rounded-xl text-xs font-medium transition-all border cursor-pointer",
                                filterMinTime === 0 && filterMaxTime === 20
                                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                                  : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400"
                              )}
                            >
                              {t.quickMeals}
                            </button>
                            <button
                              type="button"
                              onClick={() => { setFilterMinTime(20); setFilterMaxTime(45); }}
                              className={cn(
                                "px-2.5 py-1 rounded-xl text-xs font-medium transition-all border cursor-pointer",
                                filterMinTime === 20 && filterMaxTime === 45
                                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                                  : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400"
                              )}
                            >
                              {t.mediumMeals}
                            </button>
                            <button
                              type="button"
                              onClick={() => { setFilterMinTime(45); setFilterMaxTime(180); }}
                              className={cn(
                                "px-2.5 py-1 rounded-xl text-xs font-medium transition-all border cursor-pointer",
                                filterMinTime === 45 && filterMaxTime >= 180
                                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                                  : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400"
                              )}
                            >
                              {t.slowMeals}
                            </button>
                            <button
                              type="button"
                              onClick={() => { setFilterMinTime(60); setFilterMaxTime(180); }}
                              className={cn(
                                "px-2.5 py-1 rounded-xl text-xs font-medium transition-all border cursor-pointer",
                                filterMinTime === 60 && filterMaxTime >= 180
                                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                                  : "bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:border-amber-400"
                              )}
                            >
                              {t.verySlowMeals}
                            </button>
                          </div>

                          {/* Interactive Sliders Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
                            {/* Max Time Slider */}
                            <div className="space-y-1.5 p-3 rounded-xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-700/70">
                              <div className="flex justify-between items-center text-xs">
                                <label className="font-semibold text-stone-700 dark:text-stone-300">
                                  <span>{t.maxTimeSlider}</span>
                                </label>
                                <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                                  {filterMaxTime >= 180 ? t.unlimitedMax : `≤ ${filterMaxTime} ${t.minutesSuffix}`}
                                </span>
                              </div>
                              <input 
                                type="range" 
                                min="5" 
                                max="180" 
                                step="5" 
                                value={filterMaxTime} 
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setFilterMaxTime(val);
                                  if (val < filterMinTime) {
                                    setFilterMinTime(val);
                                  }
                                }}
                                className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                              />
                              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                                <span>5p</span>
                                <span>30p</span>
                                <span>60p</span>
                                <span>120p</span>
                                <span>180p+</span>
                              </div>
                            </div>

                            {/* Min Time Slider */}
                            <div className="space-y-1.5 p-3 rounded-xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-700/70">
                              <div className="flex justify-between items-center text-xs">
                                <label className="font-semibold text-stone-700 dark:text-stone-300">
                                  <span>{t.minTimeSlider}</span>
                                </label>
                                <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                                  {filterMinTime === 0 ? t.noMinRequired : `≥ ${filterMinTime} ${t.minutesSuffix}`}
                                </span>
                              </div>
                              <input 
                                type="range" 
                                min="0" 
                                max="120" 
                                step="5" 
                                value={filterMinTime} 
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setFilterMinTime(val);
                                  if (val > filterMaxTime) {
                                    setFilterMaxTime(val);
                                  }
                                }}
                                className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                              />
                              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                                <span>0p</span>
                                <span>30p</span>
                                <span>60p</span>
                                <span>90p</span>
                                <span>120p</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredRecipes.map((recipe) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -3 }}
                      onClick={() => setViewingRecipe(recipe)}
                      className="group cursor-pointer"
                    >
                        <Card className="h-full flex flex-col gap-3 overflow-hidden p-0 border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300">
                          <div className="aspect-[16/10] sm:aspect-[4/3] bg-stone-200 dark:bg-stone-800 relative overflow-hidden">
                            {recipe.imageUrl ? (
                              <img 
                                src={recipe.imageUrl} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                alt={recipe.title} 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-400">
                                <Utensils className="w-10 h-10 opacity-20" />
                              </div>
                            )}
                            <div className="absolute top-3 right-3 flex gap-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const isSaved = isRecipeSavedOffline(recipe);
                                  if (isSaved) {
                                    removeRecipeFromOffline(recipe.id || recipe.title);
                                    setOfflineRecipes(getOfflineRecipes());
                                    setToastMessage(t.offlineStorageRemoved);
                                  } else {
                                    saveRecipeForOffline(recipe, 0);
                                    setOfflineRecipes(getOfflineRecipes());
                                    setToastMessage(t.offlineStorageSuccess);
                                  }
                                }}
                                className={cn(
                                  "p-2 rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer",
                                  isRecipeSavedOffline(recipe) 
                                    ? "bg-emerald-600 text-white" 
                                    : "bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:bg-emerald-600 hover:text-white"
                                )}
                                title={isRecipeSavedOffline(recipe) ? "Đã lưu Offline (Click để xóa)" : "Lưu vào máy để nấu Offline"}
                              >
                                <HardDrive className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={(e) => toggleFavorite(recipe, e)}
                                className={cn(
                                  "p-2 rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer",
                                  recipe.isFavorite ? "bg-rose-500 text-white" : "bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:bg-rose-500 hover:text-white"
                                )}
                                title="Yêu thích"
                              >
                                <Heart className={cn("w-3.5 h-3.5", recipe.isFavorite && "fill-current")} />
                              </button>
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRecipeToDelete(recipe);
                                }}
                                className="p-2 rounded-full backdrop-blur-md shadow-md bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                                title={lang === 'vi' ? "Xóa món ăn" : lang === 'zh' ? "删除菜品" : "Delete recipe"}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-stone-800 dark:text-stone-100 shadow-sm">
                              {getCategoryLabel(recipe.category)}
                            </div>
                          </div>
                          
                          <div className="p-4 sm:p-5 pt-1 space-y-2 flex-1 flex flex-col justify-between">
                            <div className="space-y-1">
                              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-50 line-clamp-1">{recipe.title}</h3>
                              {recipe.tags && recipe.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {recipe.tags.slice(0, 2).map((t, idx) => (
                                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-medium">
                                      #{t}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-stone-400 dark:text-stone-500 text-xs">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                <span>{recipe.estimatedTime ? `${recipe.estimatedTime}m` : `${recipe.instructions.length * 5}m`}</span>
                              </div>
                              <div className="flex items-center gap-1 text-amber-500 font-bold">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <span>{recipe.rating || 5}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                </section>

                {filteredRecipes.length === 0 && (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 bg-stone-100 dark:bg-stone-900 rounded-full flex items-center justify-center mx-auto">
                      <Search className="w-6 h-6 text-stone-300" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-stone-600 dark:text-stone-400">{t.noRecipes}</h3>
                    <p className="text-stone-400 text-sm">
                      {(filterMinTime > 0 || filterMaxTime < 180) ? t.noRecipesInTime : t.noRecipesDesc}
                    </p>
                    {(filterMinTime > 0 || filterMaxTime < 180) && (
                      <Button 
                        variant="secondary"
                        onClick={() => { setFilterMinTime(0); setFilterMaxTime(180); }}
                        className="mt-2 text-xs py-2 px-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1 text-amber-600" /> {t.resetFilter}
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}

            {activeTab === 'planner' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50">{t.weeklyPlannerTitle}</h2>
                    <p className="text-stone-500 dark:text-stone-400 text-sm italic">{t.weeklyPlannerDesc}</p>
                  </div>
                  <Button
                    onClick={addWeeklyMealPlansToGrocery}
                    disabled={isProcessing || mealPlans.length === 0}
                    variant="secondary"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-sm bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-800 hover:border-amber-500 cursor-pointer disabled:opacity-40"
                    title={t.addPlannerToGrocery}
                  >
                    <ShoppingCart className="w-4 h-4 text-amber-600" />
                    <span>{t.addPlannerToGrocery}</span>
                  </Button>
                </div>

                {/* Daily Summary Card for Today */}
                <div className="bg-gradient-to-r from-amber-500/15 via-amber-600/5 to-transparent dark:from-amber-500/20 dark:via-stone-900/40 p-5 sm:p-6 rounded-3xl border border-amber-500/25 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-50 flex items-center gap-2">
                          <span>{t.dailySummary}</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-600 text-white font-bold">
                            {lang === 'vi' ? (todayEnglish === 'Monday' ? 'Thứ Hai' : todayEnglish === 'Tuesday' ? 'Thứ Ba' : todayEnglish === 'Wednesday' ? 'Thứ Tư' : todayEnglish === 'Thursday' ? 'Thứ Năm' : todayEnglish === 'Friday' ? 'Thứ Sáu' : todayEnglish === 'Saturday' ? 'Thứ Bảy' : 'Chủ Nhật') : todayEnglish}
                          </span>
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {todayPlans.length > 0 ? `${todayPlans.length} meal(s) scheduled for today` : t.noMealsToday}
                        </p>
                      </div>
                    </div>
                    {todayPlans.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5">
                          🔥 {totalCalories} kcal
                        </span>
                      </div>
                    )}
                  </div>

                  {todayPlans.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div className="bg-white dark:bg-stone-900 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 text-center shadow-sm">
                        <span className="text-[10px] text-stone-400 uppercase font-bold block">{t.totalCalories}</span>
                        <span className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">{totalCalories} kcal</span>
                      </div>
                      <div className="bg-white dark:bg-stone-900 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 text-center shadow-sm">
                        <span className="text-[10px] text-stone-400 uppercase font-bold block">{t.totalProtein}</span>
                        <span className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-100">{Math.round(totalProtein * 10) / 10} g</span>
                      </div>
                      <div className="bg-white dark:bg-stone-900 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 text-center shadow-sm">
                        <span className="text-[10px] text-stone-400 uppercase font-bold block">{t.totalFat}</span>
                        <span className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-100">{Math.round(totalFat * 10) / 10} g</span>
                      </div>
                      <div className="bg-white dark:bg-stone-900 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 text-center shadow-sm">
                        <span className="text-[10px] text-stone-400 uppercase font-bold block">{t.totalCarbs}</span>
                        <span className="text-base sm:text-lg font-bold text-stone-800 dark:text-stone-100">{Math.round(totalCarbs * 10) / 10} g</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Weekly Health & Nutrition Analytics Chart */}
                <Card className="p-5 sm:p-6 space-y-5 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-50 flex items-center gap-2">
                        <span>📊 {t.weeklyHealthStats}</span>
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {t.weeklyHealthDesc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl">
                      <button
                        onClick={() => setActiveChartMetric('calories')}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                          activeChartMetric === 'calories'
                            ? "bg-amber-600 text-white shadow-sm"
                            : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                        )}
                      >
                        {t.calorieTab}
                      </button>
                      <button
                        onClick={() => setActiveChartMetric('macros')}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                          activeChartMetric === 'macros'
                            ? "bg-amber-600 text-white shadow-sm"
                            : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                        )}
                      >
                        {t.macroTab}
                      </button>
                    </div>
                  </div>

                  {/* Chart Container */}
                  <div className="h-72 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      {activeChartMetric === 'calories' ? (
                        <AreaChart data={weeklyNutritionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#d97706" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.4} />
                          <XAxis dataKey="day" stroke="#78716c" fontSize={12} tickLine={false} />
                          <YAxis stroke="#78716c" fontSize={12} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ background: '#1c1917', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                            formatter={(value: any) => [`${value} kcal`, 'Calories']}
                          />
                          <Area type="monotone" dataKey="calories" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorCalories)" />
                        </AreaChart>
                      ) : (
                        <BarChart data={weeklyNutritionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.4} />
                          <XAxis dataKey="day" stroke="#78716c" fontSize={12} tickLine={false} />
                          <YAxis stroke="#78716c" fontSize={12} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ background: '#1c1917', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                            formatter={(value: any, name: any) => [`${value}g`, name === 'protein' ? 'Protein' : name === 'fat' ? 'Fat' : 'Carbs']}
                          />
                          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                          <Bar dataKey="protein" name="Protein (g)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                          <Bar dataKey="fat" name="Fat (g)" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                          <Bar dataKey="carbs" name="Carbs (g)" fill="#10b981" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  </div>

                  {/* Weekly Aggregate Footer */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
                    <div className="bg-stone-50 dark:bg-stone-800/60 p-3 rounded-2xl border border-stone-100 dark:border-stone-800">
                      <span className="text-stone-400 block font-bold mb-0.5">{t.weeklyTotal} Calories</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">
                        {weeklyNutritionData.reduce((acc, cur) => acc + cur.calories, 0)} kcal
                      </span>
                    </div>
                    <div className="bg-stone-50 dark:bg-stone-800/60 p-3 rounded-2xl border border-stone-100 dark:border-stone-800">
                      <span className="text-stone-400 block font-bold mb-0.5">{t.weeklyAverage}</span>
                      <span className="font-bold text-stone-800 dark:text-stone-100 text-sm">
                        {Math.round(weeklyNutritionData.reduce((acc, cur) => acc + cur.calories, 0) / 7)} kcal/day
                      </span>
                    </div>
                    <div className="bg-stone-50 dark:bg-stone-800/60 p-3 rounded-2xl border border-stone-100 dark:border-stone-800">
                      <span className="text-stone-400 block font-bold mb-0.5">Avg Protein</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">
                        {Math.round(weeklyNutritionData.reduce((acc, cur) => acc + cur.protein, 0) / 7)}g / day
                      </span>
                    </div>
                    <div className="bg-stone-50 dark:bg-stone-800/60 p-3 rounded-2xl border border-stone-100 dark:border-stone-800">
                      <span className="text-stone-400 block font-bold mb-0.5">Avg Carbs</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                        {Math.round(weeklyNutritionData.reduce((acc, cur) => acc + cur.carbs, 0) / 7)}g / day
                      </span>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                    const dayLabel = lang === 'vi' ? (day === 'Monday' ? 'Thứ Hai' : day === 'Tuesday' ? 'Thứ Ba' : day === 'Wednesday' ? 'Thứ Tư' : day === 'Thursday' ? 'Thứ Năm' : day === 'Friday' ? 'Thứ Sáu' : day === 'Saturday' ? 'Thứ Bảy' : 'Chủ Nhật') :
                                     lang === 'zh' ? (day === 'Monday' ? '周一' : day === 'Tuesday' ? '周二' : day === 'Wednesday' ? '周三' : day === 'Thursday' ? '周四' : day === 'Friday' ? '周五' : day === 'Saturday' ? '周六' : '周日') : day;
                    const dayPlans = mealPlans.filter(m => m.day === day);

                    return (
                      <Card key={day} className="flex flex-col gap-3 p-4 sm:p-5 border-stone-200 dark:border-stone-800">
                        <div className="border-b border-stone-100 dark:border-stone-800 pb-2.5 flex justify-between items-center">
                          <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-50">{dayLabel}</h3>
                          <span className="text-xs bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">{dayPlans.length}</span>
                        </div>

                        <div className="space-y-2.5 min-h-[90px]">
                          {dayPlans.map(plan => (
                            <div key={plan.id} className="p-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-100 dark:border-stone-800 flex justify-between items-start group">
                              <div className="space-y-0.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">{plan.mealType}</span>
                                <p className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-100">{plan.title}</p>
                              </div>
                              <button 
                                onClick={async () => {
                                  if (plan.id) await deleteDoc(doc(db, 'mealPlans', plan.id));
                                }}
                                className="text-stone-400 hover:text-red-500 transition-colors cursor-pointer p-1"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}

                          {dayPlans.length === 0 && (
                            <div className="text-center text-stone-400 text-xs italic py-4">
                              -
                            </div>
                          )}
                        </div>

                        <button 
                          onClick={() => {
                            setSelectedPlannerDay(day);
                            setPlannerMealType('Dinner');
                            setPlannerMealTitle('');
                          }}
                          className="w-full py-2 rounded-xl border border-dashed border-stone-300 dark:border-stone-700 text-stone-500 hover:border-amber-500 hover:text-amber-600 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
                        >
                          <Plus className="w-3.5 h-3.5" /> {t.addMeal}
                        </button>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'grocery' && (
              <div className="space-y-6 max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-50">{t.groceryTitle}</h2>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
                        {groceryItems.length} {lang === 'vi' ? 'món' : lang === 'zh' ? '件' : 'items'}
                      </span>
                    </div>
                    <p className="text-stone-500 dark:text-stone-400 text-sm italic">{t.groceryDesc}</p>
                  </div>


                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    <Button
                      onClick={() => setShowAnalytics(!showAnalytics)}
                      variant="secondary"
                      className={cn(
                        "flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition-all cursor-pointer",
                        showAnalytics ? "bg-amber-600 text-white" : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-800"
                      )}
                    >
                      <Activity className="w-3.5 h-3.5 text-amber-600" />
                      <span>{showAnalytics ? "Ẩn phân tích" : "📊 Phân tích"}</span>
                    </Button>

                    {checkedItems.length > 0 && (
                      <Button
                        onClick={clearCheckedGroceries}
                        variant="secondary"
                        className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-900/50 cursor-pointer"
                        title={t.clearCheckedBtn}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{t.clearCheckedBtn} ({checkedItems.length})</span>
                        <span className="sm:hidden">Dọn ({checkedItems.length})</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Smart Supermarket Route Banner */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-stone-700 dark:text-stone-300 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm text-base font-bold">
                      🛒
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-bold text-amber-800 dark:text-amber-400 block text-xs uppercase tracking-wider">
                        {lang === 'vi' ? 'Lộ trình siêu thị thông minh' : lang === 'zh' ? '智能超市动线' : 'Smart Supermarket Route'}
                      </span>
                      <p className="text-xs text-stone-600 dark:text-stone-400">
                        {t.supermarketRouteHint}
                      </p>
                    </div>
                  </div>
                  <div className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-950/80 px-3 py-1 rounded-xl self-start sm:self-center shrink-0">
                    {checkedItems.length}/{groceryItems.length} {lang === 'vi' ? 'đã mua' : lang === 'zh' ? '已采购' : 'picked'} ({groceryItems.length > 0 ? Math.round((checkedItems.length / groceryItems.length) * 100) : 0}%)
                  </div>
                </div>

                {showAnalytics && (
                  <Card className="space-y-6 bg-gradient-to-br from-amber-50/50 via-white to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 p-6 border-amber-500/30">
                    <div className="flex justify-between items-center border-b border-stone-200 dark:border-stone-800 pb-3">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                          <span>📊 Shopping Analytics</span>
                          <span className="text-xs bg-amber-600 text-white px-2.5 py-0.5 rounded-full font-bold">
                            {checkedItems.length} checked
                          </span>
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400">Estimated spending breakdown by category for checked grocery items</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 uppercase font-bold block">Estimated Total</span>
                        <span className="text-xl font-bold text-amber-600 dark:text-amber-400">${totalCheckedSpending.toFixed(2)}</span>
                      </div>
                    </div>

                    {analyticsChartData.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="h-64 w-full bg-white dark:bg-stone-900 p-3 rounded-2xl border border-stone-200 dark:border-stone-800 flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsChartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                              <XAxis dataKey="category" tick={{ fill: '#78716c', fontSize: 10 }} />
                              <YAxis tick={{ fill: '#78716c', fontSize: 10 }} />
                              <RechartsTooltip />
                              <Bar dataKey="spending" fill="#d97706" radius={[6, 6, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Category Breakdown</h4>
                          <div className="space-y-2">
                            {analyticsChartData.map((d, idx) => {
                              const colors = ['bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500'];
                              const percentage = totalCheckedSpending > 0 ? Math.round((d.spending / totalCheckedSpending) * 100) : 0;
                              return (
                                <div key={idx} className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={cn("w-3 h-3 rounded-full", colors[idx % colors.length])} />
                                    <div>
                                      <span className="text-xs font-bold text-stone-800 dark:text-stone-100 block">{d.category}</span>
                                      <span className="text-[10px] text-stone-400">{d.count} items checked</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100 block">${d.spending.toFixed(2)}</span>
                                    <span className="text-[10px] text-amber-600 font-semibold">{percentage}%</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-stone-400 text-sm italic">
                        No items checked yet. Check off items in your grocery list to view shopping analytics!
                      </div>
                    )}
                  </Card>
                )}

                {/* Add Grocery Input Card & Aisle Quick Filter Pills */}
                <Card className="space-y-4">
                  <form onSubmit={handleAddGrocery} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          placeholder={t.groceryPlaceholder} 
                          value={newGroceryName}
                          onChange={(e) => setNewGroceryName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-500/20"
                        />
                      </div>

                      <input 
                        type="text" 
                        placeholder="SL (VD: 500g, 1 bó...)" 
                        value={newGroceryQuantity}
                        onChange={(e) => setNewGroceryQuantity(e.target.value)}
                        className="w-full sm:w-28 px-3 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-500/20"
                      />

                      <select 
                        value={newGroceryCategory}
                        onChange={(e) => setNewGroceryCategory(e.target.value)}
                        className="px-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-100 text-xs sm:text-sm outline-none font-medium cursor-pointer"
                      >
                        <option value="Auto">{t.autoOption}</option>
                        {SUPERMARKET_AISLE_CONFIG.map(aisle => (
                          <option key={aisle.key} value={aisle.key}>
                            {aisle.icon} {lang === 'vi' ? aisle.nameVi : lang === 'zh' ? aisle.nameZh : aisle.nameEn}
                          </option>
                        ))}
                      </select>

                      <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 text-sm shrink-0 cursor-pointer">
                        <Plus className="w-4 h-4" /> {t.addBtn}
                      </Button>
                    </div>

                    {/* Real-time detected aisle preview hint */}
                    {newGroceryName.trim().length > 0 && newGroceryCategory === 'Auto' && (
                      <div className="flex items-center gap-2 text-xs pt-0.5 px-1 animate-fadeIn">
                        <span className="text-stone-500 dark:text-stone-400 font-medium">{t.autoDetectedAisle}</span>
                        {(() => {
                          const detected = classifySupermarketItem(newGroceryName);
                          const info = getAisleInfo(detected);
                          return (
                            <span className={cn("px-2.5 py-0.5 rounded-full font-bold text-xs flex items-center gap-1.5 border shadow-2xs", info.badgeBg, info.badgeBorder, info.badgeText)}>
                              <span>{info.icon}</span>
                              <span>{lang === 'vi' ? info.nameVi : lang === 'zh' ? info.nameZh : info.nameEn}</span>
                            </span>
                          );
                        })()}
                      </div>
                    )}
                  </form>

                  {/* Aisle Quick Filter Pills Bar */}
                  {groceryItems.length > 0 && (
                    <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                          {lang === 'vi' ? 'Lọc theo khu vực siêu thị:' : lang === 'zh' ? '按超市分区筛选：' : 'Filter by Aisle:'}
                        </span>
                        {selectedGroceryAisle !== 'All' && (
                          <button 
                            onClick={() => setSelectedGroceryAisle('All')}
                            className="text-[11px] text-amber-600 hover:underline font-semibold cursor-pointer"
                          >
                            {lang === 'vi' ? 'Xem tất cả khu vực' : lang === 'zh' ? '查看全部分区' : 'View all aisles'}
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                        <button
                          onClick={() => setSelectedGroceryAisle('All')}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border",
                            selectedGroceryAisle === 'All'
                              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                              : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-amber-400"
                          )}
                        >
                          <span>✨</span>
                          <span>{t.allAisles}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10 dark:bg-white/10 font-bold">
                            {groceryItems.length}
                          </span>
                        </button>

                        {SUPERMARKET_AISLE_CONFIG.map(aisle => {
                          const itemsInAisle = groceryItems.filter(i => {
                            const rawCat = i.category || 'Other';
                            const cat = SUPERMARKET_AISLES.includes(rawCat as any) ? rawCat : classifySupermarketItem(i.name);
                            return cat === aisle.key;
                          });
                          if (itemsInAisle.length === 0) return null;
                          const isAisleCompleted = itemsInAisle.every(i => i.checked);
                          const isSelected = selectedGroceryAisle === aisle.key;

                          return (
                            <button
                              key={aisle.key}
                              onClick={() => setSelectedGroceryAisle(isSelected ? 'All' : aisle.key)}
                              className={cn(
                                "px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border",
                                isSelected
                                  ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                                  : isAisleCompleted
                                  ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                                  : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-amber-400"
                              )}
                            >
                              <span>{aisle.icon}</span>
                              <span>{lang === 'vi' ? aisle.nameVi.split('&')[0].trim() : lang === 'zh' ? aisle.nameZh.split('与')[0].trim() : aisle.nameEn.split('&')[0].trim()}</span>
                              <span className={cn(
                                "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                                isSelected ? "bg-white/20 text-white" : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                              )}>
                                {isAisleCompleted ? '✓' : itemsInAisle.length}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Card>

                {/* Categorized Supermarket Sections List */}
                <div className="space-y-4">
                  {(selectedGroceryAisle === 'All' 
                    ? SUPERMARKET_AISLE_CONFIG.map(a => a.key) 
                    : [selectedGroceryAisle]
                  ).map(aisleKey => {
                    const info = getAisleInfo(aisleKey);
                    const itemsInAisle = groceryItems.filter(item => {
                      const rawCat = item.category || 'Other';
                      const cat = SUPERMARKET_AISLES.includes(rawCat as any) ? rawCat : classifySupermarketItem(item.name);
                      return cat === aisleKey;
                    }).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                    if (itemsInAisle.length === 0) return null;

                    const checkedInAisle = itemsInAisle.filter(i => i.checked);
                    const isAisleFullyDone = checkedInAisle.length === itemsInAisle.length;
                    const aislePercent = Math.round((checkedInAisle.length / itemsInAisle.length) * 100);

                    return (
                      <div 
                        key={aisleKey} 
                        className={cn(
                          "rounded-2xl border transition-all p-4 sm:p-5 space-y-3.5",
                          isAisleFullyDone
                            ? "bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-300/80 dark:border-emerald-900/50 shadow-xs"
                            : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 shadow-sm"
                        )}
                      >
                        {/* Aisle Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-stone-100 dark:border-stone-800 pb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl shrink-0">{info.icon}</span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                                  {lang === 'vi' ? info.nameVi : lang === 'zh' ? info.nameZh : info.nameEn}
                                </h3>
                                <span className={cn("text-xs px-2.5 py-0.5 rounded-full font-bold border", info.badgeBg, info.badgeBorder, info.badgeText)}>
                                  {itemsInAisle.length} {lang === 'vi' ? 'món' : 'items'}
                                </span>
                              </div>
                              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                                {lang === 'vi' ? info.descriptionVi : ''}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center">
                            {isAisleFullyDone ? (
                              <span className="text-xs px-3 py-1 rounded-full bg-emerald-600 text-white font-bold flex items-center gap-1.5 shadow-sm">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{t.aisleCompleted}</span>
                              </span>
                            ) : (
                              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
                                <span>{checkedInAisle.length}/{itemsInAisle.length}</span>
                                <div className="w-16 bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden border border-stone-200 dark:border-stone-700">
                                  <div 
                                    className="bg-amber-600 h-full rounded-full transition-all duration-300"
                                    style={{ width: `${aislePercent}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Items in this aisle */}
                        <div className="space-y-3 divide-y divide-stone-100 dark:divide-stone-800">
                          {itemsInAisle.map(item => (
                            <div 
                              key={item.id} 
                              draggable
                              onDragStart={(e) => item.id && handleGroceryDragStart(e, item.id)}
                              onDragOver={handleGroceryDragOver}
                              onDrop={(e) => item.id && handleGroceryDrop(e, item.id, itemsInAisle)}
                              className={cn(
                                "pt-3 first:pt-0 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 cursor-grab active:cursor-grabbing transition-opacity",
                                draggedGroceryId === item.id && "opacity-40"
                              )}
                            >
                              <div className="flex items-center gap-2 shrink-0">
                                <div className="text-stone-300 dark:text-stone-700 hover:text-stone-500 cursor-grab">
                                  <GripVertical className="w-4 h-4" />
                                </div>
                                <input 
                                  type="checkbox" 
                                  checked={item.checked} 
                                  onChange={() => item.id && toggleGrocery(item.id, item.checked)}
                                  className="w-4.5 h-4.5 rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer shrink-0"
                                />
                              </div>

                              {editingGroceryId === item.id ? (
                                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                                  <input 
                                    type="text"
                                    value={editingGroceryName}
                                    onChange={(e) => setEditingGroceryName(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        item.id && updateGroceryName(item.id, editingGroceryName);
                                      } else if (e.key === 'Escape') {
                                        setEditingGroceryId(null);
                                      }
                                    }}
                                    onBlur={() => item.id && updateGroceryName(item.id, editingGroceryName)}
                                    autoFocus
                                    className="grocery-item-input flex-1 px-3 py-1.5 rounded-xl border border-amber-500 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none shadow-sm"
                                  />
                                </div>
                              ) : (
                                <span 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (item.id) {
                                      setEditingGroceryId(item.id);
                                      setEditingGroceryName(item.name);
                                    }
                                  }}
                                  title="Click để chỉnh sửa tên món"
                                  className={cn(
                                    "flex-1 min-w-[160px] text-sm sm:text-base font-medium text-stone-800 dark:text-stone-200 truncate hover:text-amber-600 transition-colors cursor-pointer",
                                    item.checked && "line-through text-stone-400 dark:text-stone-600"
                                  )}
                                >
                                  {item.name}
                                </span>
                              )}

                              <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
                                {/* Quantity input */}
                                <input 
                                  type="text" 
                                  value={item.quantity || '1'}
                                  onChange={(e) => item.id && updateGroceryQuantity(item.id, e.target.value)}
                                  title="Số lượng"
                                  className="w-16 px-2 py-1 text-xs text-center rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 outline-none focus:border-amber-500"
                                />

                                {/* Inline Supermarket Aisle Changer */}
                                <select
                                  value={item.category || aisleKey}
                                  onChange={(e) => item.id && updateGroceryCategory(item.id, e.target.value)}
                                  title="Chuyển sang khu vực siêu thị khác"
                                  className="text-[11px] font-medium px-2 py-1 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 outline-none hover:border-amber-500 transition-colors cursor-pointer"
                                >
                                  {SUPERMARKET_AISLE_CONFIG.map(a => (
                                    <option key={a.key} value={a.key}>
                                      {a.icon} {lang === 'vi' ? a.nameVi.split('&')[0].trim() : a.nameEn.split('&')[0].trim()}
                                    </option>
                                  ))}
                                </select>

                                {/* Delete button */}
                                <button 
                                  onClick={() => item.id && deleteGrocery(item.id)}
                                  className="text-stone-400 hover:text-red-500 transition-colors cursor-pointer p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                                  title="Xóa nguyên liệu"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {groceryItems.length === 0 && (
                    <Card className="text-center py-12 text-stone-400 text-sm italic space-y-2">
                      <div className="text-3xl">🛒</div>
                      <p>{t.groceryEmpty}</p>
                      <p className="text-xs text-stone-500">{lang === 'vi' ? 'Bạn có thể nhập tên món bất kỳ, hệ thống sẽ tự động phân loại đúng khu vực siêu thị!' : 'Enter any item and it will be automatically categorized into its supermarket aisle!'}</p>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* --- Modals --- */}

        {/* View Recipe Modal */}
        <Modal 
          isOpen={!!viewingRecipe} 
          onClose={() => { setViewingRecipe(null); setIsDeleteConfirmOpen(false); }} 
          title={viewingRecipe?.title}
        >
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase">{getCategoryLabel(viewingRecipe?.category)}</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{viewingRecipe?.rating || 5}</span>
                </div>
                {viewingRecipe?.estimatedTime && (
                  <div className="flex items-center gap-1 text-stone-500 text-xs sm:text-sm">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{viewingRecipe.estimatedTime}m</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
                <Button 
                  onClick={() => {
                    if (viewingRecipe) {
                      startCooking(viewingRecipe, 0);
                      setViewingRecipe(null);
                    }
                  }}
                  className="flex-1 sm:flex-none bg-amber-600 hover:bg-amber-700 text-white rounded-full px-4 text-xs sm:text-sm py-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> {t.cookingMode}
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => {
                    if (!viewingRecipe) return;
                    const isSaved = isRecipeSavedOffline(viewingRecipe);
                    if (isSaved) {
                      removeRecipeFromOffline(viewingRecipe.id || viewingRecipe.title);
                      setOfflineRecipes(getOfflineRecipes());
                      setToastMessage(t.offlineStorageRemoved);
                    } else {
                      saveRecipeForOffline(viewingRecipe, 0);
                      setOfflineRecipes(getOfflineRecipes());
                      setToastMessage(t.offlineStorageSuccess);
                    }
                  }}
                  className={cn(
                    "flex-1 sm:flex-none text-xs sm:text-sm py-2 px-3.5 rounded-full flex items-center gap-1.5 cursor-pointer transition-colors",
                    isRecipeSavedOffline(viewingRecipe)
                      ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                      : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-500"
                  )}
                  title="Lưu các bước nấu ăn vào bộ nhớ thiết bị để xem không cần mạng"
                >
                  {isRecipeSavedOffline(viewingRecipe) ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t.savedOfflineBtn}</span>
                    </>
                  ) : (
                    <>
                      <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.saveOfflineBtn}</span>
                    </>
                  )}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => viewingRecipe && addAllIngredientsToGrocery(viewingRecipe)}
                  className="flex-1 sm:flex-none bg-stone-100 dark:bg-stone-800 text-xs sm:text-sm py-2"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> {t.addToGrocery}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    if (viewingRecipe) {
                      setRecipeToPrint(viewingRecipe);
                      setIsPrintModalOpen(true);
                    }
                  }}
                  className="flex-1 sm:flex-none bg-stone-100 dark:bg-stone-800 text-xs sm:text-sm py-2 flex items-center gap-1.5 cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700"
                  title={t.printRecipe}
                >
                  <Printer className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> {t.printRecipe}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={async () => {
                    if (!viewingRecipe) return;
                    const shareText = `Check out this amazing recipe: ${viewingRecipe.title}\n\nIngredients:\n${viewingRecipe.ingredients.join('\n')}\n\nInstructions:\n${viewingRecipe.instructions.join('\n')}`;
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: viewingRecipe.title,
                          text: shareText,
                          url: window.location.href,
                        });
                      } catch (err) {
                        console.error('Error sharing:', err);
                      }
                    } else {
                      try {
                        await navigator.clipboard.writeText(shareText);
                        setToastMessage("Đã sao chép công thức vào clipboard để chia sẻ!");
                      } catch (e) {
                        setToastMessage("Không thể chia sẻ công thức.");
                      }
                    }
                  }}
                  className="flex-1 sm:flex-none bg-stone-100 dark:bg-stone-800 text-xs sm:text-sm py-2"
                  title="Share Recipe"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </Button>
              </div>
            </div>

            {viewingRecipe?.imageUrl && (
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800 shadow-sm">
                <img 
                  src={viewingRecipe.imageUrl} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                  alt={viewingRecipe.title} 
                />
              </div>
            )}

            {/* Nutrition Information Card & Radar Chart */}
            {(viewingRecipe?.calories !== undefined || viewingRecipe?.protein !== undefined || viewingRecipe?.fat !== undefined || viewingRecipe?.carbs !== undefined) && (
              <div className="p-4 sm:p-6 bg-stone-100 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 font-serif font-bold text-base">
                    <Activity className="w-5 h-5 text-amber-600" />
                    <span>{t.nutritionInfo}</span>
                  </div>
                  {viewingRecipe?.calories !== undefined && (
                    <span className="px-3 py-1 bg-amber-600 text-white font-bold text-xs rounded-full shadow-sm">
                      {viewingRecipe.calories} kcal
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 text-center">
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">{t.protein}</span>
                      <span className="text-lg font-bold text-stone-800 dark:text-stone-100">{viewingRecipe.protein ?? 0} g</span>
                    </div>
                    <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 text-center">
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">{t.fat}</span>
                      <span className="text-lg font-bold text-stone-800 dark:text-stone-100">{viewingRecipe.fat ?? 0} g</span>
                    </div>
                    <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 text-center col-span-2">
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">{t.carbs}</span>
                      <span className="text-lg font-bold text-stone-800 dark:text-stone-100">{viewingRecipe.carbs ?? 0} g</span>
                    </div>
                  </div>

                  {/* Recharts Radar Chart */}
                  <div className="h-44 w-full bg-white dark:bg-stone-900 p-2 rounded-2xl border border-stone-200 dark:border-stone-800 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                        { subject: t.protein, value: viewingRecipe.protein || 0, fullMark: 50 },
                        { subject: t.fat, value: viewingRecipe.fat || 0, fullMark: 50 },
                        { subject: t.carbs, value: viewingRecipe.carbs || 0, fullMark: 100 },
                      ]}>
                        <PolarGrid stroke="#e7e5e4" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#78716c', fontSize: 11 }} />
                        <Radar name="Nutrition" dataKey="value" stroke="#d97706" fill="#fbbf24" fillOpacity={0.5} />
                        <RechartsTooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {viewingRecipe?.winePairing && (
              <div className="p-3 sm:p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded-2xl flex items-center gap-3 text-amber-900 dark:text-amber-200">
                <Wine className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold text-[11px] uppercase tracking-wider block">{t.winePairing}</span>
                  <p className="text-xs sm:text-sm">{viewingRecipe.winePairing}</p>
                </div>
              </div>
            )}

            {viewingRecipe?.notes && (
              <div className="p-3 sm:p-4 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl space-y-1 text-amber-900 dark:text-amber-200">
                <span className="font-bold text-[11px] uppercase tracking-wider block text-amber-700 dark:text-amber-400">{t.notes}</span>
                <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">{viewingRecipe.notes}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-3">
                <h4 className="text-base font-serif font-bold border-b border-stone-200 dark:border-stone-800 pb-2 text-stone-900 dark:text-stone-50 flex items-center gap-2">
                  <Soup className="w-4.5 h-4.5 text-amber-600" /> {t.ingredients}
                </h4>
                <ul className="space-y-2">
                  {viewingRecipe?.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-600 dark:text-stone-300 text-xs sm:text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2 space-y-3">
                <h4 className="text-base font-serif font-bold border-b border-stone-200 dark:border-stone-800 pb-2 text-stone-900 dark:text-stone-50 flex items-center gap-2">
                  <ChefHat className="w-4.5 h-4.5 text-amber-600" /> {t.instructions}
                </h4>
                <ol className="space-y-4">
                  {viewingRecipe?.instructions.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold text-xs">
                        {i + 1}
                      </span>
                      <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center">
              <Button 
                variant="danger" 
                onClick={() => {
                  if (viewingRecipe) {
                    setRecipeToDelete(viewingRecipe);
                  }
                }} 
                className="text-xs py-2 px-3.5 bg-red-600 hover:bg-red-700 text-white flex items-center gap-1.5 rounded-xl shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" /> {t.delete}
              </Button>
              <Button onClick={() => { setEditingRecipe(viewingRecipe); setViewingRecipe(null); setIsAddModalOpen(true); }} className="text-xs py-1.5 bg-stone-800 dark:bg-stone-100 text-stone-50 dark:text-stone-900">
                <Edit2 className="w-3.5 h-3.5" /> {t.edit}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Cooking Mode Modal with Offline Support */}
        {cookingRecipe && (
          <div className="fixed inset-0 z-50 bg-stone-950 text-stone-100 flex flex-col p-4 sm:p-8 md:p-12 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-stone-800 pb-4 sm:pb-6 gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-amber-500 font-bold text-[10px] sm:text-xs uppercase tracking-wider">{t.cookingMode}</span>
                  {!isOnline ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                      <WifiOff className="w-3 h-3 text-amber-400" />
                      <span>{t.offlineMode}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      <HardDrive className="w-3 h-3 text-emerald-400" />
                      <span>{t.offlineReadyBadge}</span>
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-3xl font-serif font-bold truncate max-w-[220px] sm:max-w-md md:max-w-xl">{cookingRecipe.title}</h2>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Ingredients checklist toggle */}
                <button
                  onClick={() => setShowCookingIngredients(!showCookingIngredients)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer",
                    showCookingIngredients 
                      ? "bg-amber-600 text-white border-amber-500 shadow-sm" 
                      : "bg-stone-900 text-stone-300 border-stone-800 hover:border-amber-500"
                  )}
                  title="Xem nguyên liệu món ăn (Hoạt động cả khi Offline)"
                >
                  <Soup className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline">{t.cookingIngredientsList}</span>
                </button>

                {/* Offline Cache Toggle */}
                <button
                  onClick={() => {
                    const isSaved = isRecipeSavedOffline(cookingRecipe);
                    if (isSaved) {
                      removeRecipeFromOffline(cookingRecipe.id || cookingRecipe.title);
                      setOfflineRecipes(getOfflineRecipes());
                      setToastMessage(t.offlineStorageRemoved);
                    } else {
                      saveRecipeForOffline(cookingRecipe, cookingStep);
                      setOfflineRecipes(getOfflineRecipes());
                      setToastMessage(t.offlineStorageSuccess);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer",
                    isRecipeSavedOffline(cookingRecipe)
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/80"
                      : "bg-stone-900 text-stone-300 border-stone-800 hover:border-amber-500"
                  )}
                  title="Lưu các bước nấu ăn vào bộ nhớ máy để xem ngoại tuyến không cần mạng"
                >
                  <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">
                    {isRecipeSavedOffline(cookingRecipe) ? t.savedOfflineBtn : t.saveOfflineBtn}
                  </span>
                </button>

                {/* Voice Control Button */}
                <button
                  onClick={toggleCookingVoiceControl}
                  className={cn(
                    "flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer",
                    isCookingListening 
                      ? "bg-red-600 text-white border-red-500 animate-pulse shadow-lg" 
                      : "bg-stone-900 text-stone-300 border-stone-800 hover:border-amber-500"
                  )}
                  title={t.voiceControlToggle}
                >
                  <Mic className={cn("w-4 h-4", isCookingListening && "animate-bounce")} />
                  <span className="hidden sm:inline">{isCookingListening ? "Voice Active" : t.voiceControl}</span>
                  <div className={cn("w-2.5 h-2.5 rounded-full transition-colors", isCookingListening ? "bg-white animate-ping" : "bg-stone-600")} />
                </button>

                {/* Close Button */}
                <button 
                  onClick={() => closeCookingMode(false)}
                  className="p-2 sm:p-3 bg-stone-900 hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
                  title="Đóng chế độ nấu ăn (Đã tự động lưu phiên nấu dở)"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Offline Notification Alert */}
            {!isOnline && (
              <div className="max-w-2xl mx-auto w-full px-4 pt-3">
                <div className="bg-amber-950/50 border border-amber-500/40 text-amber-200 px-3.5 py-2 rounded-2xl text-xs flex items-center justify-between gap-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{t.offlineNotice}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold shrink-0">
                    localStorage
                  </span>
                </div>
              </div>
            )}

            {/* Ingredients Checklist Drawer / Panel */}
            {showCookingIngredients && (
              <div className="max-w-2xl mx-auto w-full px-4 pt-3 animate-fadeIn">
                <div className="p-4 bg-stone-900/95 border border-stone-800 rounded-2xl space-y-2.5 shadow-2xl backdrop-blur-md">
                  <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Soup className="w-4 h-4" /> {t.cookingIngredientsList}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <HardDrive className="w-3 h-3" /> {t.offlineReadyBadge}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {cookingRecipe.ingredients.map((ing, idx) => (
                      <label key={idx} className="flex items-center gap-2 text-xs text-stone-300 hover:text-stone-100 cursor-pointer p-1.5 rounded-lg hover:bg-stone-800/60 transition-colors">
                        <input type="checkbox" className="rounded border-stone-700 text-amber-600 focus:ring-amber-500 cursor-pointer" />
                        <span className="truncate">{ing}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Visual Progress Bar Section */}
            <div className="max-w-2xl mx-auto w-full px-4 pt-6 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-stone-400">
                <span>{t.step} {cookingStep + 1} / {cookingRecipe.instructions.length}</span>
                <span className="text-amber-400 font-bold">{Math.round(((cookingStep + 1) / cookingRecipe.instructions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-stone-900 h-3 rounded-full overflow-hidden p-0.5 border border-stone-800/80 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-500 shadow-md shadow-amber-500/20" 
                  style={{ width: `${((cookingStep + 1) / cookingRecipe.instructions.length) * 100}%` }}
                />
              </div>
              {/* Step interactive dots */}
              <div className="flex justify-between px-1 pt-1.5">
                {cookingRecipe.instructions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCookingStep(idx)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all cursor-pointer",
                      idx === cookingStep 
                        ? "bg-amber-500 scale-125 ring-2 ring-amber-500/40" 
                        : idx < cookingStep 
                        ? "bg-amber-600/70" 
                        : "bg-stone-800 hover:bg-stone-700"
                    )}
                    title={`Step ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* AI Timer Widget */}
            {(cookingTimerSeconds !== null || isTimerRunning) && (
              <div className="max-w-md mx-auto w-full px-4 pt-3">
                <div className="bg-stone-900 border border-amber-500/30 p-3.5 rounded-2xl flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center animate-pulse">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">AI Cooking Timer</span>
                      <span className="text-xl font-mono font-bold text-amber-400">
                        {cookingTimerSeconds !== null ? `${Math.floor(cookingTimerSeconds / 60).toString().padStart(2, '0')}:${(cookingTimerSeconds % 60).toString().padStart(2, '0')}` : '00:00'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      {isTimerRunning ? 'Pause' : 'Resume'}
                    </button>
                    <button 
                      onClick={() => { setIsTimerRunning(false); setCookingTimerSeconds(null); }}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col justify-center items-center text-center space-y-6 sm:space-y-8 py-4">
              <span className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-sm sm:text-lg tracking-widest uppercase">
                {t.step} {cookingStep + 1} / {cookingRecipe.instructions.length}
              </span>
              
              <p className="text-xl sm:text-3xl md:text-4xl font-serif leading-relaxed text-stone-100 max-w-3xl px-2">
                {cookingRecipe.instructions[cookingStep]}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button 
                  onClick={() => isSpeaking ? stopSpeaking() : speakStep(cookingRecipe.instructions[cookingStep])}
                  variant="secondary"
                  className={cn(
                    "px-4 py-2.5 text-xs sm:text-sm rounded-xl flex items-center gap-2 cursor-pointer",
                    isSpeaking ? "bg-amber-600 text-white animate-pulse" : "bg-stone-900 text-stone-200 hover:bg-stone-800"
                  )}
                >
                  <Volume2 className={cn("w-4 h-4", isSpeaking && "animate-bounce")} />
                  <span>{isSpeaking ? "Đang đọc..." : t.readAloud}</span>
                </Button>

                <Button 
                  onClick={toggleCookingVoiceControl}
                  variant="secondary"
                  className={cn(
                    "px-4 py-2.5 text-xs sm:text-sm rounded-xl flex items-center gap-2 cursor-pointer",
                    isCookingListening ? "bg-red-600 text-white animate-pulse" : "bg-stone-900 text-stone-200 hover:bg-stone-800"
                  )}
                >
                  <Mic className={cn("w-4 h-4", isCookingListening && "animate-bounce")} />
                  <span>{isCookingListening ? t.listeningVoice : t.voiceControl}</span>
                </Button>
              </div>
              {isCookingListening && (
                <p className="text-xs text-amber-400 italic">{t.voiceHint}</p>
              )}

              <div className="flex items-center gap-3 pt-4 w-full max-w-md justify-center">
                <Button 
                  disabled={cookingStep === 0}
                  onClick={() => setCookingStep(prev => Math.max(0, prev - 1))}
                  variant="secondary"
                  className="flex-1 py-3 text-sm sm:text-base bg-stone-900 text-stone-200 hover:bg-stone-800 disabled:opacity-30 cursor-pointer"
                >
                  {t.prevStep}
                </Button>
                
                <Button 
                  onClick={() => {
                    if (cookingStep === cookingRecipe.instructions.length - 1) {
                      closeCookingMode(true);
                      setToastMessage(lang === 'en' ? `Success! Completed cooking "${cookingRecipe.title}".` :
                                      lang === 'zh' ? `太棒了！完成烹饪“${cookingRecipe.title}”。` :
                                      `Tuyệt vời! Đã hoàn thành nấu món "${cookingRecipe.title}".`);
                    } else {
                      setCookingStep(prev => Math.min(cookingRecipe.instructions.length - 1, prev + 1));
                    }
                  }}
                  className="flex-1 py-3 text-sm sm:text-base bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
                >
                  {cookingStep === cookingRecipe.instructions.length - 1 ? t.complete : t.nextStep}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Offline Recipes Manager Modal */}
        <Modal
          isOpen={showOfflineModal}
          onClose={() => setShowOfflineModal(false)}
          title={t.offlineModalTitle}
        >
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2.5">
              <HardDrive className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-stone-900 dark:text-stone-100">{t.offlineMode}</p>
                <p className="text-stone-500 dark:text-stone-400 text-xs mt-0.5">{t.offlineModalDesc}</p>
              </div>
            </div>

            {offlineRecipes.length > 0 ? (
              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {offlineRecipes.map((r, i) => (
                  <div key={i} className="p-3.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-center justify-between gap-3 hover:border-amber-400 transition-all">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">{r.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold shrink-0">
                          {r.instructions?.length || 0} {lang === 'vi' ? 'bước' : 'steps'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-stone-500">
                        {r.estimatedTime && <span>⏱️ {r.estimatedTime}m</span>}
                        <span>🥗 {r.ingredients?.length || 0} {lang === 'vi' ? 'nguyên liệu' : 'ingredients'}</span>
                        <span className="text-[10px] text-stone-400">
                          {new Date(r.savedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        onClick={() => {
                          setShowOfflineModal(false);
                          startCooking(r as unknown as Recipe, r.savedStep || 0);
                        }}
                        className="px-3.5 py-1.5 text-xs bg-amber-600 hover:bg-amber-700 text-white rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{lang === 'vi' ? 'Nấu ngay' : 'Cook'}</span>
                      </Button>
                      <button
                        onClick={() => {
                          removeRecipeFromOffline(r.id || r.title);
                          setOfflineRecipes(getOfflineRecipes());
                          setToastMessage(t.offlineStorageRemoved);
                        }}
                        className="p-2 text-stone-400 hover:text-red-500 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
                        title="Xóa khỏi bộ nhớ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-stone-400 text-sm italic space-y-2">
                <HardDrive className="w-8 h-8 mx-auto opacity-30 text-amber-600" />
                <p>{t.noOfflineRecipes}</p>
              </div>
            )}
          </div>
        </Modal>

        {/* Add/Edit Recipe Modal */}
        <Modal 
          isOpen={isAddModalOpen} 
          onClose={() => { 
            setIsAddModalOpen(false); 
            setEditingRecipe(null); 
            setRecipeFormError(null); 
            setIsCompressingImage(false); 
            setImageSizeKb(null); 
          }} 
          title={editingRecipe?.id ? t.edit : t.addRecipe}
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleSaveRecipe({
                title: formData.get('title') as string,
                category: formData.get('category') as Category,
                rating: Number(formData.get('rating')),
                estimatedTime: formData.get('estimatedTime') ? Number(formData.get('estimatedTime')) : null,
                ingredients: (formData.get('ingredients') as string).split('\n').filter(i => i.trim()),
                instructions: (formData.get('instructions') as string).split('\n').filter(i => i.trim()),
                imageUrl: formImageUrl,
                sourceUrl: formData.get('sourceUrl') as string,
                winePairing: formData.get('winePairing') as string,
                notes: formData.get('notes') as string,
                tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean),
                calories: formData.get('calories') ? Number(formData.get('calories')) : undefined,
                protein: formData.get('protein') ? Number(formData.get('protein')) : undefined,
                fat: formData.get('fat') ? Number(formData.get('fat')) : undefined,
                carbs: formData.get('carbs') ? Number(formData.get('carbs')) : undefined,
              });
            }} 
            className="space-y-4 sm:space-y-6"
          >
            {recipeFormError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{recipeFormError}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t.recipeTitle}</label>
                <input name="title" required defaultValue={editingRecipe?.title} placeholder="VD: Gà kho gừng" className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-500/20" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t.category}</label>
                <select name="category" defaultValue={editingRecipe?.category || 'Dinner'} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none">
                  <option value="Breakfast">{t.breakfast}</option>
                  <option value="Lunch">{t.lunch}</option>
                  <option value="Dinner">{t.dinner}</option>
                  <option value="Dessert">{t.dessert}</option>
                  <option value="Snack">{t.snack}</option>
                  <option value="Drink">{t.drink}</option>
                  <option value="Other">{t.other}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t.rating}</label>
                <input name="rating" type="number" min="1" max="5" defaultValue={editingRecipe?.rating || 5} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t.timeMinutes}</label>
                <input name="estimatedTime" type="number" min="1" defaultValue={editingRecipe?.estimatedTime || 30} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t.tags}</label>
                <input name="tags" defaultValue={editingRecipe?.tags?.join(', ')} placeholder="Nhanh..." className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none" />
              </div>
            </div>

            {/* Nutrition Inputs */}
            <div className="p-4 bg-stone-100 dark:bg-stone-800/40 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
              <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">{t.nutritionInfo} (Optional)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase">{t.calories} (kcal)</label>
                  <input name="calories" type="number" min="0" defaultValue={editingRecipe?.calories} placeholder="e.g. 400" className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-xs outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase">{t.protein} (g)</label>
                  <input name="protein" type="number" min="0" defaultValue={editingRecipe?.protein} placeholder="e.g. 25" className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-xs outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase">{t.fat} (g)</label>
                  <input name="fat" type="number" min="0" defaultValue={editingRecipe?.fat} placeholder="e.g. 15" className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-xs outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase">{t.carbs} (g)</label>
                  <input name="carbs" type="number" min="0" defaultValue={editingRecipe?.carbs} placeholder="e.g. 45" className="w-full px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-xs outline-none" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t.ingredientsLabel}</label>
              <textarea name="ingredients" required rows={4} defaultValue={editingRecipe?.ingredients.join('\n')} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t.notes}</label>
              <textarea name="notes" rows={3} defaultValue={editingRecipe?.notes} placeholder="VD: Ướp thịt 15 phút trước khi kho..." className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t.instructionsLabel}</label>
              <textarea name="instructions" required rows={4} defaultValue={editingRecipe?.instructions.join('\n')} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none" />
            </div>

            <div className="space-y-3 p-4 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-200 dark:border-stone-800">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {t.imageUrl}
                </label>
                <div className="flex items-center p-0.5 bg-stone-200/70 dark:bg-stone-700/60 rounded-xl text-xs">
                  <button
                    type="button"
                    onClick={() => setImageInputMode('upload')}
                    className={cn(
                      "px-3 py-1 rounded-lg transition-all font-medium flex items-center gap-1.5 cursor-pointer text-xs",
                      imageInputMode === 'upload' 
                        ? "bg-white dark:bg-stone-800 text-amber-600 dark:text-amber-400 shadow-xs" 
                        : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                    )}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{t.uploadImageTab || "Tải ảnh / Chụp"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputMode('url')}
                    className={cn(
                      "px-3 py-1 rounded-lg transition-all font-medium flex items-center gap-1.5 cursor-pointer text-xs",
                      imageInputMode === 'url' 
                        ? "bg-white dark:bg-stone-800 text-amber-600 dark:text-amber-400 shadow-xs" 
                        : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                    )}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>{t.urlImageTab || "Link URL"}</span>
                  </button>
                </div>
              </div>

              {imageInputMode === 'upload' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment"
                      disabled={isCompressingImage}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setIsCompressingImage(true);
                          setRecipeFormError(null);
                          compressImage(file, 960, 0.75)
                            .then(res => {
                              setFormImageUrl(res.dataUrl);
                              setImageSizeKb(res.sizeKb);
                            })
                            .catch(err => {
                              console.error("Compression error:", err);
                              setRecipeFormError("Không thể xử lý hình ảnh này. Vui lòng chọn ảnh khác.");
                            })
                            .finally(() => {
                              setIsCompressingImage(false);
                            });
                        }
                      }}
                      className="w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-100 dark:file:bg-amber-950/60 file:text-amber-800 dark:file:text-amber-300 hover:file:bg-amber-200 cursor-pointer border border-stone-200 dark:border-stone-700 rounded-xl p-1 bg-white dark:bg-stone-900"
                    />
                  </div>
                  <p className="text-[11px] text-stone-400">
                    💡 Ảnh chụp/tải lên sẽ tự động nén tối ưu dưới 150KB để lưu trữ siêu nhanh và bảo đảm không vượt giới hạn hệ thống.
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => {
                      setFormImageUrl(e.target.value);
                      setImageSizeKb(null);
                    }}
                    placeholder="VD: https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                  <p className="text-[11px] text-stone-400">
                    💡 Dán đường dẫn trực tiếp của ảnh món ăn từ web (Unsplash, Pinterest, Google,...).
                  </p>
                </div>
              )}

              {isCompressingImage && (
                <div className="flex items-center gap-2.5 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-700 dark:text-amber-300 text-xs font-medium">
                  <Loader2 className="w-4 h-4 animate-spin shrink-0 text-amber-600" />
                  <span>{t.optimizingImage || "Đang nén & tối ưu dung lượng ảnh chuẩn..."}</span>
                </div>
              )}

              {formImageUrl && !isCompressingImage && (
                <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
                  <img src={formImageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 flex items-end justify-between p-3">
                    <span className="text-xs font-medium text-white bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      {imageSizeKb ? `${t.imageOptimized || "Đã tối ưu"}: ${imageSizeKb} KB` : "Link ảnh URL"}
                    </span>
                    <button 
                      type="button" 
                      onClick={() => {
                        setFormImageUrl('');
                        setImageSizeKb(null);
                      }}
                      className="p-1.5 bg-stone-900/80 hover:bg-red-600 text-white rounded-xl transition-colors cursor-pointer shadow-xs"
                      title="Xóa ảnh"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t.winePairing}</label>
              <input name="winePairing" defaultValue={editingRecipe?.winePairing} placeholder="VD: Rượu vang, trà đá, nước cam..." className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none" />
            </div>

            <Button 
              type="submit" 
              disabled={isCompressingImage}
              className="w-full py-3.5 text-base bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {isCompressingImage ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.optimizingImage || "Đang tối ưu ảnh..."}</span>
                </>
              ) : (
                t.saveRecipe
              )}
            </Button>
          </form>
        </Modal>

        {/* Import Modal */}
        <Modal isOpen={isImportModalOpen} onClose={() => { setIsImportModalOpen(false); setImportError(null); }} title={t.importModalTitle}>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t.importUrlLabel}</label>
              <input 
                type="url" 
                placeholder="https://example.com/recipe" 
                value={importUrl}
                onChange={(e) => { setImportUrl(e.target.value); setImportError(null); }}
                className="w-full px-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none focus:ring-2 focus:ring-amber-500/20" 
              />
            </div>
            {importError && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5 text-red-600 text-xs sm:text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>{importError}</p>
              </div>
            )}
            <Button className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-sm" onClick={handleImport} disabled={isProcessing || !importUrl}>
              {isProcessing ? <><Loader2 className="w-4 h-4 animate-spin" /> {t.extracting}</> : t.extractBtn}
            </Button>
            <p className="text-xs text-stone-400 text-center italic">{t.importHint}</p>
          </div>
        </Modal>



        {/* Household / Kitchen Modal */}
        <Modal isOpen={isHouseholdModalOpen} onClose={() => setIsHouseholdModalOpen(false)} title={t.accountAndKitchen || t.kitchenManagement}>
          <div className="space-y-6">
            {/* User Basic Info Section */}
            {user && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {user.displayName?.[0] || user.email?.[0] || 'C'}
                </div>
                <div className="space-y-0.5 truncate">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">{user.displayName || 'Chef'}</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{user.email}</p>
                  <span className="inline-block text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full font-bold mt-1">
                    {selectedHousehold?.name || 'Bếp'}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">{t.switchKitchen}</h3>
              <div className="grid grid-cols-1 gap-2">
                {households.map(h => (
                  <button
                    key={h.id}
                    onClick={() => { setSelectedHousehold(h); setIsHouseholdModalOpen(false); }}
                    className={cn(
                      "flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer",
                      selectedHousehold?.id === h.id 
                        ? "bg-amber-600 border-amber-600 text-white shadow-md" 
                        : "bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-amber-500 text-stone-900 dark:text-stone-100"
                    )}
                  >
                    <span className="font-medium text-sm">{h.name}</span>
                    {selectedHousehold?.id === h.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-stone-800">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">{t.createNewKitchen}</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const name = new FormData(e.currentTarget).get('name') as string;
                handleCreateHousehold(name);
              }} className="flex gap-2">
                <input name="name" required placeholder={t.kitchenNamePlaceholder} className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none" disabled={isProcessing} />
                <Button type="submit" disabled={isProcessing} className="bg-amber-600 hover:bg-amber-700 text-white text-sm">
                  {isProcessing ? <><Loader2 className="w-4 h-4 animate-spin" /> ...</> : t.createKitchenBtn}
                </Button>
              </form>
            </div>

            {/* App Policies, Rating & Support Section */}
            <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-stone-800">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Thông tin & Hỗ trợ</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveInfoModal('terms')}
                  className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-200 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>{t.termsTitle}</span>
                </button>

                <button
                  onClick={() => setActiveInfoModal('privacy')}
                  className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-200 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t.privacyTitle}</span>
                </button>

                <button
                  onClick={() => setActiveInfoModal('support')}
                  className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-200 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Headphones className="w-4 h-4 text-blue-600" />
                  <span>{t.supportTitle}</span>
                </button>

                <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col justify-center gap-1">
                  <span className="text-[11px] font-bold text-stone-700 dark:text-stone-200 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {t.rateAppTitle}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => {
                          setUserRating(star);
                          setRatedSubmitted(true);
                        }}
                        className="cursor-pointer text-amber-500 hover:scale-110 transition-transform"
                      >
                        <Star className={cn("w-3.5 h-3.5", star <= userRating ? "fill-amber-500" : "text-stone-300 dark:text-stone-600")} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {ratedSubmitted && (
                <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-center text-xs text-amber-800 dark:text-amber-300 font-medium">
                  {t.rateThank.replace('{stars}', String(userRating))}
                </div>
              )}
            </div>

            {selectedHousehold && selectedHousehold.ownerId === user.uid && (
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
                {isDeleteHouseholdConfirmOpen ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-red-600">{t.sureToDelete}</span>
                    <Button variant="danger" onClick={() => handleDeleteHousehold(selectedHousehold.id!)} className="text-xs py-1.5">
                      {t.yesDelete}
                    </Button>
                    <Button variant="secondary" onClick={() => setIsDeleteHouseholdConfirmOpen(false)} className="text-xs py-1.5">
                      {t.cancel}
                    </Button>
                  </div>
                ) : (
                  <Button variant="danger" onClick={() => setIsDeleteHouseholdConfirmOpen(true)} className="text-xs py-1.5">
                    <Trash2 className="w-3.5 h-3.5" /> {t.deleteKitchen}
                  </Button>
                )}
              </div>
            )}
          </div>
        </Modal>

        {/* Info Detail Modal (Terms / Privacy / Support) */}
        <Modal 
          isOpen={!!activeInfoModal} 
          onClose={() => setActiveInfoModal(null)} 
          title={
            activeInfoModal === 'terms' ? t.termsTitle :
            activeInfoModal === 'privacy' ? t.privacyTitle : t.supportTitle
          }
        >
          <div className="space-y-4 text-sm text-stone-700 dark:text-stone-300">
            <p className="leading-relaxed">
              {activeInfoModal === 'terms' ? t.termsContent :
               activeInfoModal === 'privacy' ? t.privacyContent : t.supportContent}
            </p>
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
              <Button onClick={() => setActiveInfoModal(null)} className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-4 py-2">
                Đã hiểu / Đóng
              </Button>
            </div>
          </div>
        </Modal>

        {/* Add Meal Plan Modal */}
        <Modal isOpen={!!selectedPlannerDay} onClose={() => setSelectedPlannerDay(null)} title={`${t.weeklyPlannerTitle} - ${selectedPlannerDay ? (lang === 'vi' ? (selectedPlannerDay === 'Monday' ? 'Thứ Hai' : selectedPlannerDay === 'Tuesday' ? 'Thứ Ba' : selectedPlannerDay === 'Wednesday' ? 'Thứ Tư' : selectedPlannerDay === 'Thursday' ? 'Thứ Năm' : selectedPlannerDay === 'Friday' ? 'Thứ Sáu' : selectedPlannerDay === 'Saturday' ? 'Thứ Bảy' : 'Chủ Nhật') : selectedPlannerDay) : ''}`}>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{t.mealType}</label>
              <select 
                value={plannerMealType}
                onChange={(e) => setPlannerMealType(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none"
              >
                <option value="Breakfast">{t.breakfast}</option>
                <option value="Lunch">{t.lunch}</option>
                <option value="Dinner">{t.dinner}</option>
                <option value="Snack">{t.snack}</option>
                <option value="Drink">{t.drink}</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Tên món ăn (hoặc chọn bên dưới)</label>
              <input 
                type="text"
                placeholder="VD: Phở bò, Cơm tấm..."
                value={plannerMealTitle}
                onChange={(e) => setPlannerMealTitle(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-sm outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Chọn nhanh từ kho công thức:</label>
              <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
                {localizedRecipes.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setPlannerMealTitle(r.title)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-950/60 text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-200 transition-colors flex justify-between items-center"
                  >
                    <span>{r.title}</span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">{getCategoryLabel(r.category)}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button 
              disabled={!plannerMealTitle.trim() || !selectedHousehold || !selectedPlannerDay}
              onClick={async () => {
                if (!plannerMealTitle.trim() || !selectedHousehold || !selectedPlannerDay) return;
                await addDoc(collection(db, 'mealPlans'), {
                  householdId: selectedHousehold.id,
                  day: selectedPlannerDay,
                  mealType: plannerMealType,
                  title: plannerMealTitle.trim()
                });
                setSelectedPlannerDay(null);
                setPlannerMealTitle('');
              }}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm"
            >
              {t.addBtn}
            </Button>
          </div>
        </Modal>

        {/* Delete Recipe Confirmation Modal (In-App Confirm, works seamlessly in iframe) */}
        <Modal 
          isOpen={!!recipeToDelete} 
          onClose={() => setRecipeToDelete(null)} 
          title={t.sureToDelete}
        >
          <div className="space-y-4">
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-2xl flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-red-900 dark:text-red-200">
                  {lang === 'vi' ? 'Xác nhận xóa món ăn' : lang === 'zh' ? '确认删除菜品' : 'Confirm Delete Recipe'}
                </h4>
                <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
                  {lang === 'vi' 
                    ? `Bạn có chắc chắn muốn xóa vĩnh viễn món "${recipeToDelete?.title}" khỏi thực đơn không? Hành động này không thể hoàn tác.` 
                    : lang === 'zh' 
                    ? `您确定要从食谱中永久删除“${recipeToDelete?.title}”吗？此操作无法撤销。` 
                    : `Are you sure you want to permanently delete "${recipeToDelete?.title}"? This action cannot be undone.`}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button 
                variant="ghost" 
                onClick={() => setRecipeToDelete(null)}
                className="text-xs py-2 px-4"
              >
                {t.cancel}
              </Button>
              <Button 
                variant="danger" 
                onClick={() => {
                  if (recipeToDelete?.id) {
                    handleDeleteRecipe(recipeToDelete.id);
                  }
                }}
                className="text-xs py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.yesDelete}</span>
              </Button>
            </div>
          </div>
        </Modal>

        {/* Success Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-md bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl shadow-2xl border border-amber-500/30 flex items-center gap-3"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400 dark:text-amber-600">
                  {lang === 'vi' ? 'Thông Báo' : lang === 'zh' ? '提示' : 'Notification'}
                </h4>
                <p className="text-xs sm:text-sm font-medium break-words leading-snug">{toastMessage}</p>
              </div>
              <button 
                onClick={() => setToastMessage(null)}
                className="text-stone-400 hover:text-stone-200 dark:hover:text-stone-800 p-1 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Print Recipe Modal */}
        <PrintRecipeModal
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          recipe={recipeToPrint || viewingRecipe}
          householdName={selectedHousehold?.name}
          lang={lang}
          getCategoryLabel={getCategoryLabel}
        />

        {/* Hidden on screen, shown when browser invokes window.print() */}
        {(recipeToPrint || viewingRecipe) && (
          <div id="recipe-print-area" className="hidden print:block">
            <PrintableRecipeContent
              recipe={(recipeToPrint || viewingRecipe)!}
              options={{
                includeImage: true,
                includeNutrition: true,
                includeCheckboxes: true,
                includeNotes: true,
                twoColumns: true,
              }}
              householdName={selectedHousehold?.name}
              lang={lang}
              getCategoryLabel={getCategoryLabel}
            />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
