import React, { useState } from 'react';
import { Recipe } from '../types';
import { 
  Printer, 
  X, 
  Check, 
  Square, 
  Clock, 
  Star, 
  ChefHat, 
  Soup, 
  Activity, 
  Wine, 
  Sparkles,
  LayoutGrid,
  Image as ImageIcon
} from 'lucide-react';

export interface PrintOptions {
  includeImage: boolean;
  includeNutrition: boolean;
  includeCheckboxes: boolean;
  includeNotes: boolean;
  twoColumns: boolean;
}

interface PrintRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
  householdName?: string;
  lang?: 'vi' | 'en' | 'zh';
  getCategoryLabel: (cat?: string) => string;
}

export const PrintableRecipeContent: React.FC<{
  recipe: Recipe;
  options: PrintOptions;
  householdName?: string;
  lang?: 'vi' | 'en' | 'zh';
  getCategoryLabel: (cat?: string) => string;
}> = ({ recipe, options, householdName, lang = 'vi', getCategoryLabel }) => {
  const currentDate = new Date().toLocaleDateString(lang === 'vi' ? 'vi-VN' : lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const t = {
    vi: {
      appName: "NomNow • Bếp Việt Gia Đình",
      category: "Danh mục",
      kitchen: "Bếp",
      rating: "Đánh giá",
      cookTime: "Thời gian",
      servings: "Khẩu phần",
      ingredientsTitle: "NGUYÊN LIỆU CẦN CHUẨN BỊ",
      instructionsTitle: "HƯỚNG DẪN CÁCH CHẾ BIẾN",
      nutritionTitle: "GIÁ TRỊ DINH DƯỠNG (ƯỚC TÍNH)",
      calories: "Năng lượng",
      protein: "Chất đạm",
      fat: "Chất béo",
      carbs: "Tinh bột",
      step: "Bước",
      winePairing: "Gợi ý thức uống đi kèm",
      chefNotes: "Mẹo & Ghi chú đầu bếp",
      footerWish: "Chúc bạn và gia đình có một bữa ăn ngon miệng và trọn vị yêu thương!",
      printedOn: "Ngày in công thức",
    },
    en: {
      appName: "NomNow • Family Recipe Kitchen",
      category: "Category",
      kitchen: "Kitchen",
      rating: "Rating",
      cookTime: "Time",
      servings: "Servings",
      ingredientsTitle: "INGREDIENTS LIST",
      instructionsTitle: "COOKING INSTRUCTIONS",
      nutritionTitle: "NUTRITION FACTS (ESTIMATED)",
      calories: "Calories",
      protein: "Protein",
      fat: "Fat",
      carbs: "Carbs",
      step: "Step",
      winePairing: "Recommended Pairing",
      chefNotes: "Chef's Notes & Tips",
      footerWish: "Bon appétit! Enjoy your delicious homemade meal with loved ones.",
      printedOn: "Printed on",
    },
    zh: {
      appName: "NomNow • 家庭温馨厨房",
      category: "分类",
      kitchen: "厨房",
      rating: "评分",
      cookTime: "烹饪时间",
      servings: "份量",
      ingredientsTitle: "所需食材清单",
      instructionsTitle: "烹饪步骤与制作方法",
      nutritionTitle: "营养成分表 (预估)",
      calories: "卡路里",
      protein: "蛋白质",
      fat: "脂肪",
      carbs: "碳水化合物",
      step: "步骤",
      winePairing: "推荐饮品搭配",
      chefNotes: "大厨小贴士与备忘",
      footerWish: "祝您与家人享受温馨美味的一餐！",
      printedOn: "打印日期",
    }
  }[lang] || {
    appName: "NomNow • Bếp Việt Gia Đình",
    category: "Danh mục",
    kitchen: "Bếp",
    rating: "Đánh giá",
    cookTime: "Thời gian",
    servings: "Khẩu phần",
    ingredientsTitle: "NGUYÊN LIỆU CẦN CHUẨN BỊ",
    instructionsTitle: "HƯỚNG DẪN CÁCH CHẾ BIẾN",
    nutritionTitle: "GIÁ TRỊ DINH DƯỠNG (ƯỚC TÍNH)",
    calories: "Năng lượng",
    protein: "Chất đạm",
    fat: "Chất béo",
    carbs: "Tinh bột",
    step: "Bước",
    winePairing: "Gợi ý thức uống đi kèm",
    chefNotes: "Mẹo & Ghi chú đầu bếp",
    footerWish: "Chúc bạn và gia đình có một bữa ăn ngon miệng và trọn vị yêu thương!",
    printedOn: "Ngày in công thức",
  };

  const hasNutrition = (
    recipe.calories !== undefined ||
    recipe.protein !== undefined ||
    recipe.fat !== undefined ||
    recipe.carbs !== undefined
  );

  return (
    <div className="bg-white text-stone-900 p-6 sm:p-8 font-sans leading-relaxed selection:bg-amber-100 max-w-4xl mx-auto">
      {/* Printable Header */}
      <header className="border-b-2 border-stone-900 pb-4 mb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
              <ChefHat className="w-4 h-4 text-amber-700" />
              <span>{t.appName}</span>
              {householdName && (
                <>
                  <span>•</span>
                  <span>{t.kitchen}: {householdName}</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-950 mt-1.5 tracking-tight leading-tight">
              {recipe.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-stone-600 font-medium">
              <span>{t.category}: <strong className="text-stone-900">{getCategoryLabel(recipe.category)}</strong></span>
              {recipe.rating && (
                <span>{t.rating}: <strong className="text-stone-900">{'★'.repeat(recipe.rating)}{'☆'.repeat(5 - recipe.rating)}</strong> ({recipe.rating}/5)</span>
              )}
              {recipe.estimatedTime && (
                <span>{t.cookTime}: <strong className="text-stone-900">{recipe.estimatedTime} phút</strong></span>
              )}
            </div>
          </div>

          {recipe.estimatedTime && (
            <div className="border border-stone-800 rounded-xl p-2.5 text-center min-w-[75px] shrink-0 bg-stone-50">
              <span className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">Thời gian</span>
              <span className="text-lg font-black text-stone-900">{recipe.estimatedTime}m</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-stone-200">
            {recipe.tags.map((tag, i) => (
              <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-700">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Optional Photo */}
      {options.includeImage && recipe.imageUrl && (
        <div className="mb-6 rounded-xl overflow-hidden border border-stone-300 max-h-56 bg-stone-100">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-56 object-cover" 
          />
        </div>
      )}

      {/* Main Two-Column or Single-Column Body */}
      <div className={options.twoColumns ? "grid grid-cols-1 md:grid-cols-12 gap-8 items-start" : "space-y-6"}>
        {/* Ingredients Column */}
        <section className={options.twoColumns ? "md:col-span-5 space-y-3" : "space-y-3"}>
          <div className="border-b border-stone-800 pb-1.5 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-950 flex items-center gap-1.5 font-serif">
              <Soup className="w-4 h-4 text-amber-700" />
              <span>{t.ingredientsTitle}</span>
            </h2>
            <span className="text-xs text-stone-500 font-semibold">({recipe.ingredients?.length || 0})</span>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-stone-800 pt-1">
            {recipe.ingredients?.map((ing, i) => (
              <li key={i} className="flex items-start gap-2.5 print-avoid-break">
                {options.includeCheckboxes ? (
                  <span className="inline-block w-3.5 h-3.5 border-1.5 border-stone-600 rounded-xs mt-0.5 shrink-0 bg-white" />
                ) : (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0" />
                )}
                <span className="leading-snug">{ing}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Instructions Column */}
        <section className={options.twoColumns ? "md:col-span-7 space-y-3" : "space-y-3"}>
          <div className="border-b border-stone-800 pb-1.5 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-950 flex items-center gap-1.5 font-serif">
              <ChefHat className="w-4 h-4 text-amber-700" />
              <span>{t.instructionsTitle}</span>
            </h2>
            <span className="text-xs text-stone-500 font-semibold">({recipe.instructions?.length || 0} {t.step.toLowerCase()})</span>
          </div>

          <ol className="space-y-3.5 pt-1">
            {recipe.instructions?.map((step, i) => (
              <li key={i} className="flex items-start gap-3 print-avoid-break">
                <span className="w-5 h-5 rounded-md bg-stone-900 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {i + 1}
                </span>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Extra Info: Nutrition Facts */}
      {options.includeNutrition && hasNutrition && (
        <section className="mt-6 pt-4 border-t border-stone-200 print-avoid-break">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5 flex items-center gap-1.5 font-serif">
            <Activity className="w-3.5 h-3.5 text-amber-700" />
            <span>{t.nutritionTitle}</span>
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="border border-stone-200 bg-stone-50 rounded-lg p-2">
              <span className="text-[10px] text-stone-500 block uppercase font-medium">{t.calories}</span>
              <strong className="text-sm text-stone-900">{recipe.calories ?? '--'} kcal</strong>
            </div>
            <div className="border border-stone-200 bg-stone-50 rounded-lg p-2">
              <span className="text-[10px] text-stone-500 block uppercase font-medium">{t.protein}</span>
              <strong className="text-sm text-stone-900">{recipe.protein ?? '--'} g</strong>
            </div>
            <div className="border border-stone-200 bg-stone-50 rounded-lg p-2">
              <span className="text-[10px] text-stone-500 block uppercase font-medium">{t.fat}</span>
              <strong className="text-sm text-stone-900">{recipe.fat ?? '--'} g</strong>
            </div>
            <div className="border border-stone-200 bg-stone-50 rounded-lg p-2">
              <span className="text-[10px] text-stone-500 block uppercase font-medium">{t.carbs}</span>
              <strong className="text-sm text-stone-900">{recipe.carbs ?? '--'} g</strong>
            </div>
          </div>
        </section>
      )}

      {/* Extra Info: Notes & Drink Pairing */}
      {options.includeNotes && (recipe.notes || recipe.winePairing) && (
        <section className="mt-4 pt-3 border-t border-stone-200 space-y-2.5 print-avoid-break">
          {recipe.winePairing && (
            <div className="text-xs bg-amber-50/80 border border-amber-200 rounded-lg p-2.5 flex items-start gap-2 text-amber-950">
              <Wine className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">{t.winePairing}:</strong>
                <span>{recipe.winePairing}</span>
              </div>
            </div>
          )}
          {recipe.notes && (
            <div className="text-xs bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-800">
              <strong className="block font-bold text-stone-900 mb-0.5">{t.chefNotes}:</strong>
              <p className="whitespace-pre-line leading-relaxed">{recipe.notes}</p>
            </div>
          )}
        </section>
      )}

      {/* Printable Footer */}
      <footer className="mt-8 pt-3 border-t-2 border-stone-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2 print-avoid-break">
        <span>{t.footerWish}</span>
        <span className="font-medium text-stone-600">
          {t.printedOn}: {currentDate}
        </span>
      </footer>
    </div>
  );
};

export const PrintRecipeModal: React.FC<PrintRecipeModalProps> = ({
  isOpen,
  onClose,
  recipe,
  householdName,
  lang = 'vi',
  getCategoryLabel
}) => {
  const [options, setOptions] = useState<PrintOptions>({
    includeImage: true,
    includeNutrition: true,
    includeCheckboxes: true,
    includeNotes: true,
    twoColumns: true,
  });

  if (!isOpen || !recipe) return null;

  const handleTriggerPrint = () => {
    // Invoke browser print
    window.print();
  };

  const labels = {
    vi: {
      modalTitle: "In Công Thức Nấu Ăn",
      subtitle: "Bố cục đã được tối ưu hóa cho máy in, tiết kiệm mực và giấy.",
      printBtn: "In Ngay (Print / PDF)",
      includeImage: "Ảnh món ăn",
      includeNutrition: "Bảng dinh dưỡng",
      includeCheckboxes: "Ô tích nguyên liệu (☐)",
      includeNotes: "Ghi chú & Đồ uống",
      twoColumns: "Chia 2 cột gọn gàng",
      close: "Đóng",
      previewLabel: "Xem trước trang in (A4)"
    },
    en: {
      modalTitle: "Print Recipe",
      subtitle: "Optimized layout for printer or saving as PDF, saving ink and paper.",
      printBtn: "Print Now (Print / PDF)",
      includeImage: "Recipe photo",
      includeNutrition: "Nutrition facts",
      includeCheckboxes: "Ingredient checkboxes (☐)",
      includeNotes: "Notes & pairing",
      twoColumns: "2-column layout",
      close: "Close",
      previewLabel: "Print Preview (A4)"
    },
    zh: {
      modalTitle: "打印食谱",
      subtitle: "已针对打印机与PDF导出进行排版优化，清晰省墨。",
      printBtn: "立即打印 (Print / PDF)",
      includeImage: "菜品图片",
      includeNutrition: "营养成分",
      includeCheckboxes: "食材复选框 (☐)",
      includeNotes: "备注与搭配",
      twoColumns: "双栏紧凑布局",
      close: "关闭",
      previewLabel: "打印预览 (A4)"
    }
  }[lang] || {
    modalTitle: "In Công Thức Nấu Ăn",
    subtitle: "Bố cục đã được tối ưu hóa cho máy in, tiết kiệm mực và giấy.",
    printBtn: "In Ngay (Print / PDF)",
    includeImage: "Ảnh món ăn",
    includeNutrition: "Bảng dinh dưỡng",
    includeCheckboxes: "Ô tích nguyên liệu (☐)",
    includeNotes: "Ghi chú & Đồ uống",
    twoColumns: "Chia 2 cột gọn gàng",
    close: "Đóng",
    previewLabel: "Xem trước trang in (A4)"
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 dark:bg-black/80 backdrop-blur-sm no-print"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-stone-900 rounded-[2rem] w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-stone-200 dark:border-stone-800"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600/10 border border-amber-600/20 text-amber-600 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>{labels.modalTitle}</span>
                <span className="text-xs font-normal text-stone-500 font-sans">({recipe.title})</span>
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">{labels.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerPrint}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{labels.printBtn}</span>
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Options Toolbar */}
        <div className="px-4 sm:px-6 py-2.5 bg-stone-100/70 dark:bg-stone-800/40 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider text-[10px]">
            Tùy chọn in:
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-stone-700 dark:text-stone-300 select-none">
              <input 
                type="checkbox" 
                checked={options.includeImage} 
                onChange={(e) => setOptions(prev => ({ ...prev, includeImage: e.target.checked }))}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer w-3.5 h-3.5"
              />
              <span>{labels.includeImage}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-stone-700 dark:text-stone-300 select-none">
              <input 
                type="checkbox" 
                checked={options.includeCheckboxes} 
                onChange={(e) => setOptions(prev => ({ ...prev, includeCheckboxes: e.target.checked }))}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer w-3.5 h-3.5"
              />
              <span>{labels.includeCheckboxes}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-stone-700 dark:text-stone-300 select-none">
              <input 
                type="checkbox" 
                checked={options.twoColumns} 
                onChange={(e) => setOptions(prev => ({ ...prev, twoColumns: e.target.checked }))}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer w-3.5 h-3.5"
              />
              <span>{labels.twoColumns}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-stone-700 dark:text-stone-300 select-none">
              <input 
                type="checkbox" 
                checked={options.includeNutrition} 
                onChange={(e) => setOptions(prev => ({ ...prev, includeNutrition: e.target.checked }))}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer w-3.5 h-3.5"
              />
              <span>{labels.includeNutrition}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-stone-700 dark:text-stone-300 select-none">
              <input 
                type="checkbox" 
                checked={options.includeNotes} 
                onChange={(e) => setOptions(prev => ({ ...prev, includeNotes: e.target.checked }))}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer w-3.5 h-3.5"
              />
              <span>{labels.includeNotes}</span>
            </label>
          </div>
        </div>

        {/* Live A4 Print Preview Scroll Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-200/60 dark:bg-stone-950/60 flex justify-center">
          <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl border border-stone-300 overflow-hidden">
            <PrintableRecipeContent 
              recipe={recipe} 
              options={options} 
              householdName={householdName}
              lang={lang}
              getCategoryLabel={getCategoryLabel}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between">
          <span className="text-xs text-stone-500 dark:text-stone-400 hidden sm:inline">
            💡 Gợi ý: Trong hộp thoại in của trình duyệt, chọn <strong>"Save as PDF"</strong> nếu bạn muốn lưu file về máy.
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl cursor-pointer"
            >
              {labels.close}
            </button>
            <button
              onClick={handleTriggerPrint}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>{labels.printBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
