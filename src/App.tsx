import { useState, useCallback, useEffect } from "react";

const T = {
  bg: "#F5F3EE",
  surface: "#FFFFFF",
  dark: "#1C1917",
  mid: "#78716C",
  light: "#E7E5E0",
  accent: "#C65D2A",
  accentBg: "#FBF0EB",
  green: "#3D7A5A",
  greenBg: "#EBF5F0",
  blue: "#2A5F8A",
  blueBg: "#EBF2F8",
  purple: "#6B4FA0",
  purpleBg: "#F2EEF8",
  navH: 64,
  topH: 52,
};

const INITIAL_RECIPES = [
  {
    id: 1, title: "Spicy Asian Grilled Shrimp",
    course: "Entrées", protein: "Seafood", baseServings: 10,
    cookTime: "15 min + 1hr marinade", baseCalories: 80,
    ingredients: [
      { amount: 2.25, unit: "lbs", name: "peeled, butterflied shrimp (21/25 count)" },
      { amount: 3, unit: "cloves", name: "garlic, minced" },
      { amount: 1.5, unit: "tbsp", name: "rice wine vinegar" },
      { amount: 1.5, unit: "tsp", name: "Chinese Five-Spice Powder" },
      { amount: 1.5, unit: "tsp", name: "minced fresh ginger" },
      { amount: 1, unit: "tsp", name: "Tabasco sauce" },
      { amount: 1, unit: "tsp", name: "fish sauce" },
      { amount: 1, unit: "tsp", name: "sesame oil" },
    ],
    instructions: [
      "Combine the shrimp with all remaining ingredients and marinate under refrigeration for at least 1 hour.",
      "Shake excess marinade from shrimp and grill until thoroughly cooked, about 2 minutes on each side.",
      "Serve on a bed of Marinated Asian Vegetable Salad.",
    ],
    nutrition: { calories: 80, protein: 16, carbs: 1, fat: 1.5, fiber: 0, sodium: 220 },
    vocabulary: [
      { term: "Butterflied", def: "Cut deeply down the center lengthwise without cutting all the way through, opening flat for even cooking." },
      { term: "Count (e.g., 21/25)", def: "How many shrimp make up one pound. 21/25 means 21–25 per pound — medium-large." },
      { term: "Mince", def: "Chop into very tiny, fine pieces for even distribution in a marinade." },
      { term: "Marinate", def: "Rest food in a seasoned liquid before cooking to infuse flavor and tenderize." },
    ],
  },
  {
    id: 2, title: "Moroccan Chicken Salad Sandwich",
    course: "Entrées", protein: "Chicken", baseServings: 10,
    cookTime: "1 hr 15 min", baseCalories: 460,
    ingredients: [
      { amount: 1.5, unit: "tbsp", name: "lemon juice (marinade)" },
      { amount: 1, unit: "tsp", name: "garlic powder (marinade)" },
      { amount: 1, unit: "tsp", name: "salt (marinade)" },
      { amount: 0.5, unit: "tsp", name: "paprika (marinade)" },
      { amount: 0.5, unit: "tsp", name: "ground black pepper (marinade)" },
      { amount: 0.5, unit: "tsp", name: "ground cinnamon (marinade)" },
      { amount: 0.5, unit: "tsp", name: "ground cumin (marinade)" },
      { amount: 0.25, unit: "tsp", name: "cayenne (marinade)" },
      { amount: 4.5, unit: "lbs", name: "skinless chicken legs" },
      { amount: 2.5, unit: "tbsp", name: "extra-virgin olive oil" },
      { amount: 20, unit: "fl oz", name: "Chicken Stock" },
      { amount: 3, unit: "oz", name: "pitted kalamata olives, chopped" },
      { amount: 22, unit: "oz", name: "tomato concassé" },
      { amount: 14, unit: "oz", name: "roasted peppers, diced" },
      { amount: 1, unit: "tsp", name: "chopped cilantro" },
      { amount: 1, unit: "tsp", name: "chopped parsley" },
      { amount: 10, unit: "whole", name: "whole wheat pitas" },
    ],
    instructions: [
      "Combine marinade ingredients. Add chicken, toss to coat, and marinate refrigerated for at least 30 minutes.",
      "Heat oil in a rondeau. Brown chicken evenly and remove from pan.",
      "Deglaze with stock, return chicken, add olives, bring to a simmer, cover, and braise until fork tender, about 45 minutes. Cool in braising liquid.",
      "Remove chicken. Degrease the liquid and reserve.",
      "Pull chicken from bones. Add reserved liquid, tomatoes, peppers, and herbs. Toss well.",
      "Fill each pita with the chicken salad.",
    ],
    nutrition: { calories: 460, protein: 47, carbs: 32, fat: 16, fiber: 5, sodium: 790 },
    vocabulary: [
      { term: "Rondeau", def: "Wide, shallow, heavy-bottomed pan with straight sides for searing and braising." },
      { term: "Tomato Concassé", def: "Tomatoes peeled, seeded, and coarsely chopped." },
      { term: "Deglaze", def: "Adding liquid to a hot pan to loosen caramelized bits stuck to the bottom." },
      { term: "Braise", def: "Brown at high heat then simmer slowly covered in a small amount of liquid." },
      { term: "Degrease", def: "Skim excess fat from the surface of a cooking liquid." },
    ],
  },
  {
    id: 3, title: "Seared Scallops with Beet Vinaigrette",
    course: "Entrées", protein: "Seafood", baseServings: 10,
    cookTime: "45 min", baseCalories: 140,
    ingredients: [
      { amount: 8, unit: "oz", name: "beets" },
      { amount: 3, unit: "fl oz", name: "cider vinegar" },
      { amount: 3, unit: "tbsp", name: "extra-virgin olive oil" },
      { amount: 2, unit: "tsp", name: "chopped dill" },
      { amount: 0.5, unit: "tsp", name: "salt" },
      { amount: 0.25, unit: "tsp", name: "ground black pepper" },
      { amount: 2.25, unit: "lbs", name: "sea scallops, muscle tabs removed" },
      { amount: 5, unit: "oz", name: "mixed greens" },
      { amount: 3, unit: "oz", name: "carrot julienne" },
      { amount: 3, unit: "oz", name: "daikon julienne" },
    ],
    instructions: [
      "Simmer beets in acidulated water until tender. Cool, peel, and chop.",
      "Blend beets with cider vinegar until smooth. Whisk in oil, season with dill, salt, and pepper.",
      "Pat scallops completely dry. Dry-sear in a very hot pan until deeply browned on both sides.",
      "Arrange scallops with greens, carrot, and daikon. Drizzle with beet vinaigrette.",
    ],
    nutrition: { calories: 140, protein: 18, carbs: 7, fat: 5, fiber: 1, sodium: 290 },
    vocabulary: [
      { term: "Acidulated Water", def: "Water made slightly acidic with lemon juice or vinegar — prevents browning." },
      { term: "Muscle Tabs", def: "Tough crescent-shaped muscle on the side of a scallop — removed before cooking." },
      { term: "Julienne", def: "Long, thin, uniform matchstick-shaped cuts." },
      { term: "Dry-Sear", def: "Searing in a hot pan with no oil — requires dry surfaces to build a golden crust." },
    ],
  },
  {
    id: 4, title: "Shrimp and Clam Pizza with Pesto",
    course: "Main Dishes", protein: "Seafood", baseServings: 10,
    cookTime: "30 min", baseCalories: 460,
    ingredients: [
      { amount: 2, unit: "lbs", name: "Basic Pizza Dough" },
      { amount: 10, unit: "oz", name: "Pesto" },
      { amount: 10, unit: "oz", name: "shrimp (16/20 count), halved" },
      { amount: 10, unit: "oz", name: "sun-dried tomatoes, chopped" },
      { amount: 7, unit: "oz", name: "steamed clam meat, coarsely chopped" },
      { amount: 5, unit: "oz", name: "leeks, thinly sliced and steamed" },
      { amount: 1.75, unit: "oz", name: "Parmesan cheese, grated" },
      { amount: 0.25, unit: "oz", name: "basil, cut into chiffonade" },
      { amount: 2, unit: "tsp", name: "crushed black peppercorns" },
    ],
    instructions: [
      "Roll out each ball of dough. Spread with pesto.",
      "Top with shrimp, sun-dried tomatoes, and clam meat.",
      "Add steamed leeks, Parmesan, basil chiffonade, and crushed peppercorns.",
      "Bake at 550°F (260°C) until crust is golden and crisp, about 10 minutes.",
    ],
    nutrition: { calories: 460, protein: 26, carbs: 51, fat: 18, fiber: 5, sodium: 680 },
    vocabulary: [
      { term: "Deveined", def: "Removing the dark digestive tract from shrimp." },
      { term: "Coarsely Chopped", def: "Cut into visible, bite-sized irregular pieces — adds texture." },
      { term: "Chiffonade", def: "Herb leaves stacked, rolled, and sliced crosswise into thin ribbons." },
    ],
  },
  {
    id: 5, title: "Grilled Chicken Burritos",
    course: "Main Dishes", protein: "Chicken", baseServings: 10,
    cookTime: "45 min", baseCalories: 360,
    ingredients: [
      { amount: 2.25, unit: "lbs", name: "boneless, skinless chicken breast" },
      { amount: 0.5, unit: "fl oz", name: "lime juice (marinade)" },
      { amount: 0.25, unit: "oz", name: "cilantro, chopped (marinade)" },
      { amount: 1, unit: "tbsp", name: "minced garlic (marinade)" },
      { amount: 2, unit: "tsp", name: "minced shallots (marinade)" },
      { amount: 1, unit: "tsp", name: "crushed black peppercorns (marinade)" },
      { amount: 10, unit: "whole", name: "flour tortillas (12-inch)" },
      { amount: 10, unit: "oz", name: "Guacamole" },
      { amount: 20, unit: "oz", name: "Tomatillo Salsa" },
    ],
    instructions: [
      "Trim chicken and cut into equal portions.",
      "Mix marinade ingredients, toss chicken in marinade, and chill at least 30 minutes.",
      "Grill chicken until cooked through. Slice thinly on a bias.",
      "Warm tortillas in a 250°F (120°C) oven wrapped in a damp towel.",
      "Spread tortilla with guacamole, add chicken, roll into a cone. Serve with tomatillo salsa.",
    ],
    nutrition: { calories: 360, protein: 27, carbs: 38, fat: 10, fiber: 3, sodium: 640 },
    vocabulary: [
      { term: "Trim", def: "Cut away excess fat or unwanted parts before cooking." },
      { term: "Shallots", def: "Small onion-family member with a milder, sweeter flavor." },
      { term: "Bias (Slice on a Bias)", def: "Cutting diagonally at 45° — more surface area, better presentation." },
    ],
  },
  {
    id: 6, title: "Chicken & Shrimp Pot Pie",
    course: "Main Dishes", protein: "Chicken", baseServings: 10,
    cookTime: "1 hr", baseCalories: 350,
    ingredients: [
      { amount: 2, unit: "qt", name: "Chicken Stock" },
      { amount: 1.25, unit: "lbs", name: "boneless skinless chicken breast, large dice" },
      { amount: 1, unit: "lb", name: "shrimp (16/20 count), peeled, deveined, large dice" },
      { amount: 1, unit: "oz", name: "arrowroot" },
      { amount: 21, unit: "oz", name: "potatoes, peeled and diced" },
      { amount: 14, unit: "fl oz", name: "evaporated skim milk" },
      { amount: 1, unit: "oz", name: "Dijon mustard" },
      { amount: 1.75, unit: "oz", name: "butter" },
      { amount: 3.5, unit: "oz", name: "onion, diced" },
      { amount: 3.5, unit: "oz", name: "celery, diced" },
      { amount: 3.5, unit: "oz", name: "carrot, diced" },
      { amount: 3.5, unit: "oz", name: "green pepper, diced" },
      { amount: 1, unit: "fl oz", name: "Worcestershire sauce" },
      { amount: 2.5, unit: "tbsp", name: "chopped thyme" },
      { amount: 1.5, unit: "tbsp", name: "chopped rosemary" },
      { amount: 0.5, unit: "tsp", name: "crushed black peppercorns" },
      { amount: 0.5, unit: "tsp", name: "Tabasco sauce" },
      { amount: 1, unit: "recipe", name: "Herb-Cracker Crust" },
    ],
    instructions: [
      "Bring stock to a simmer. Poach chicken 4 minutes, add shrimp 1 more minute. Remove proteins and skim stock.",
      "Mix arrowroot with cold water to form a slurry. Whisk into stock, simmer until thickened, ~2 minutes.",
      "Add potatoes and simmer until tender, about 20 minutes.",
      "Blend evaporated milk with mustard; stir into the stock.",
      "Sweat onions, celery, carrots, and peppers in butter until tender. Add to stew with proteins and seasonings. Simmer 5 minutes.",
      "Ladle into bowls and top with herb-cracker crust.",
    ],
    nutrition: { calories: 350, protein: 28, carbs: 37, fat: 10, fiber: 2, sodium: 470 },
    vocabulary: [
      { term: "Poach", def: "Cook submerged in hot liquid just below boiling (160–180°F)." },
      { term: "Slurry", def: "Cold liquid + starch mixed smooth, whisked into hot liquid as a thickener." },
      { term: "Arrowroot", def: "Gluten-free starch thickener — creates a clear, glossy finish." },
      { term: "Sweat", def: "Cook vegetables slowly in fat over low heat until soft but not browned." },
    ],
  },
  {
    id: 7, title: "Barbecued Chicken Pizza",
    course: "Main Dishes", protein: "Chicken", baseServings: 10,
    cookTime: "30 min", baseCalories: 460,
    ingredients: [
      { amount: 26, unit: "oz", name: "boneless chicken breasts, trimmed" },
      { amount: 1.5, unit: "pints", name: "Barbecue Sauce" },
      { amount: 7, unit: "oz", name: "Monterey Jack cheese, thinly sliced" },
      { amount: 2, unit: "lbs", name: "Basic Pizza Dough" },
      { amount: 10, unit: "oz", name: "Tomato Salsa" },
    ],
    instructions: [
      "Coat chicken with 8 fl oz barbecue sauce and grill to medium rare. Cool, slice ¼-inch thick, refrigerate.",
      "Roll out each ball of dough. Brush with 3 tbsp barbecue sauce.",
      "Place cheese around the outer edge. Arrange chicken on top. Add salsa in the center.",
      "Bake at 550°F (260°C) until crust is golden and crisp, about 10 minutes.",
    ],
    nutrition: { calories: 460, protein: 35, carbs: 57, fat: 10, fiber: 3, sodium: 850 },
    vocabulary: [
      { term: "Pint", def: "16 fluid ounces (≈473 ml). Two pints = one quart." },
      { term: "Medium Rare (preliminary)", def: "Partially cooking chicken before the final high-heat bake prevents it drying out." },
    ],
  },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const COURSES = ["Entrées", "Main Dishes", "Sides & Appetizers", "Desserts"];
const COURSE_ICONS = { "Entrées": "🥗", "Main Dishes": "🍽️", "Sides & Appetizers": "🥙", "Desserts": "🍮" };
const PROTEINS = ["All", "Chicken", "Seafood", "Beef", "Pork", "Vegetarian"];

const NAV = [
  { id: "cookbook", label: "My Cookbook", icon: "📚" },
  { id: "planner", label: "Week Planner", icon: "📅" },
  { id: "home", label: "Chef's Board", icon: "🍴" },
  { id: "add", label: "Add Recipe", icon: "➕" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

// ─── HELPERS ─────────────────────────────────────────────────────
function fmt(amount, ratio = 1) {
  const v = amount * ratio;
  if (v === 0) return "0";
  const whole = Math.floor(v);
  const frac = v - whole;
  const frMap = { 0.125: "⅛", 0.25: "¼", 0.33: "⅓", 0.5: "½", 0.67: "⅔", 0.75: "¾" };
  const closest = Object.keys(frMap).reduce((a, b) => Math.abs(b - frac) < Math.abs(a - frac) ? b : a);
  if (Math.abs(frac - closest) < 0.07) return whole > 0 ? `${whole}${frMap[closest]}` : frMap[closest];
  return v % 1 === 0 ? v.toFixed(0) : v.toFixed(1);
}

function calcDayNutrition(meals) {
  return meals.reduce((acc, { recipe, servings }) => ({
    calories: acc.calories + recipe.nutrition.calories * servings,
    protein: acc.protein + recipe.nutrition.protein * servings,
    carbs: acc.carbs + recipe.nutrition.carbs * servings,
    fat: acc.fat + recipe.nutrition.fat * servings,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
}

// ─── MACRO BAR ────────────────────────────────────────────────────
function MacroBar({ label, value, unit, color, max }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.mid, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 800, color: T.dark }}>{Math.round(value)}{unit}</span>
      </div>
      <div style={{ height: 6, background: T.light, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

function NutritionSummary({ meals, compact = false }) {
  const n = calcDayNutrition(meals);
  if (meals.length === 0) return null;
  return (
    <div style={{ background: compact ? "transparent" : T.surface, borderRadius: compact ? 0 : 14, padding: compact ? "12px 0 0" : "16px 18px", border: compact ? "none" : `1px solid ${T.light}` }}>
      {!compact && <p style={{ margin: "0 0 12px", fontSize: 12, fontWeight: 700, color: T.mid, textTransform: "uppercase", letterSpacing: "0.06em" }}>Nutrition Summary</p>}
      <div style={{ display: "flex", gap: 14, marginBottom: 10, flexWrap: "wrap" }}>
        <div style={{ textAlign: "center", minWidth: 60 }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: T.accent }}>{Math.round(n.calories)}</div>
          <div style={{ fontSize: 10, color: T.mid, textTransform: "uppercase" }}>kcal</div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
          <MacroBar label="Protein" value={n.protein} unit="g" color="#2A5F8A" max={200} />
          <MacroBar label="Carbs" value={n.carbs} unit="g" color="#C65D2A" max={300} />
          <MacroBar label="Fat" value={n.fat} unit="g" color="#6B4FA0" max={100} />
        </div>
      </div>
    </div>
  );
}

// ─── RECIPE MODAL ─────────────────────────────────────────────────
function RecipeModal({ recipe, onClose, onAddToPlanner }) {
  const [servings, setServings] = useState(2);
  const [customInput, setCustomInput] = useState("2");
  const [tab, setTab] = useState("ingredients");
  const [openVocab, setOpenVocab] = useState(null);
  const ratio = servings / recipe.baseServings;

  const handleCustom = (v) => {
    setCustomInput(v);
    const p = parseInt(v);
    if (!isNaN(p) && p > 0 && p <= 50) setServings(p);
  };

  const n = recipe.nutrition;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.surface, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 700, maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        {/* Drag handle */}
        <div style={{ padding: "12px 0 4px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: 40, height: 4, background: T.light, borderRadius: 2 }} />
        </div>

        {/* Header */}
        <div style={{ padding: "8px 24px 16px", borderBottom: `1px solid ${T.light}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1, paddingRight: 12 }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                <span style={{ background: T.accent, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{recipe.course}</span>
                <span style={{ background: T.light, color: T.mid, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{recipe.protein}</span>
              </div>
              <h2 style={{ margin: "0 0 3px", fontSize: 20, fontWeight: 800, color: T.dark, lineHeight: 1.2 }}>{recipe.title}</h2>
              <p style={{ margin: 0, color: T.mid, fontSize: 12 }}>⏱ {recipe.cookTime} · Base: {recipe.baseServings} servings</p>
            </div>
            <button onClick={onClose} style={{ background: T.light, border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
          </div>

          {/* Serving selector */}
          <div style={{ marginTop: 14, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.mid, textTransform: "uppercase", letterSpacing: "0.05em", marginRight: 4 }}>Servings:</span>
            {[1, 2, 3, 4].map(n => (
              <button key={n} onClick={() => { setServings(n); setCustomInput(n.toString()); }} style={{
                width: 36, height: 36, borderRadius: 10, border: `2px solid ${servings === n ? T.accent : T.light}`,
                background: servings === n ? T.accent : T.surface, color: servings === n ? "#fff" : T.dark,
                fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}>{n}</button>
            ))}
            <input type="number" min="1" max="50" value={customInput} onChange={e => handleCustom(e.target.value)}
              style={{ width: 60, height: 36, padding: "0 8px", borderRadius: 10, border: `2px solid ${T.light}`, fontSize: 14, fontWeight: 700, textAlign: "center", outline: "none", boxSizing: "border-box" }} />
            {onAddToPlanner && (
              <button onClick={() => onAddToPlanner(recipe, servings)} style={{
                marginLeft: 6, padding: "0 16px", height: 36, background: T.green, color: "#fff",
                border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap",
              }}>+ Add to Planner</button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${T.light}`, flexShrink: 0 }}>
          {["ingredients", "instructions", "nutrition"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "12px 8px", border: "none", background: "transparent",
              fontWeight: tab === t ? 700 : 500, color: tab === t ? T.accent : T.mid,
              borderBottom: tab === t ? `3px solid ${T.accent}` : "3px solid transparent",
              cursor: "pointer", fontSize: 13, textTransform: "capitalize",
            }}>{t}</button>
          ))}
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: "auto", flex: 1, padding: "20px 24px" }}>
          {tab === "ingredients" && (
            <div>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: T.mid }}>Scaled for <strong style={{ color: T.dark }}>{servings} serving{servings !== 1 ? "s" : ""}</strong></p>
              {recipe.ingredients.map((ing, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: i % 2 === 0 ? "#FAFAF8" : T.surface, borderRadius: 8, marginBottom: 3 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, color: T.accent, minWidth: 72, fontSize: 13 }}>{fmt(ing.amount, ratio)} {ing.unit}</span>
                  <span style={{ color: T.dark, fontSize: 13 }}>{ing.name}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "instructions" && (
            <div style={{ display: "grid", gap: 14 }}>
              {recipe.instructions.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ margin: 0, color: T.dark, fontSize: 14, lineHeight: 1.65, paddingTop: 3 }}>{s}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "nutrition" && (
            <div>
              <p style={{ margin: "0 0 16px", fontSize: 13, color: T.mid }}>Per serving</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
                {[
                  { label: "Calories", value: n.calories, unit: "kcal", color: T.accent },
                  { label: "Protein", value: n.protein, unit: "g", color: T.blue },
                  { label: "Carbs", value: n.carbs, unit: "g", color: T.accent },
                  { label: "Fat", value: n.fat, unit: "g", color: T.purple },
                  { label: "Fiber", value: n.fiber, unit: "g", color: T.green },
                  { label: "Sodium", value: n.sodium, unit: "mg", color: T.mid },
                ].map(m => (
                  <div key={m.label} style={{ padding: "14px 10px", background: "#FAFAF8", borderRadius: 12, textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: m.color }}>{m.value}{m.unit}</div>
                    <div style={{ fontSize: 11, color: T.mid, marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <NutritionSummary meals={[{ recipe, servings }]} compact />
            </div>
          )}

          {/* Vocabulary */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${T.light}` }}>
            <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, color: T.mid, textTransform: "uppercase", letterSpacing: "0.08em" }}>📖 Culinary Vocabulary</p>
            {recipe.vocabulary.map((v, i) => (
              <div key={i} onClick={() => setOpenVocab(openVocab === i ? null : i)}
                style={{ border: `1px solid ${T.light}`, borderRadius: 10, overflow: "hidden", marginBottom: 6, cursor: "pointer" }}>
                <div style={{ padding: "9px 14px", display: "flex", justifyContent: "space-between", background: openVocab === i ? T.accentBg : T.surface }}>
                  <span style={{ fontWeight: 700, color: T.accent, fontSize: 13 }}>{v.term}</span>
                  <span style={{ color: T.mid, fontSize: 14 }}>{openVocab === i ? "−" : "+"}</span>
                </div>
                {openVocab === i && <div style={{ padding: "9px 14px", background: "#FAFAF8", color: T.mid, fontSize: 13, lineHeight: 1.6 }}>{v.def}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: HOME ───────────────────────────────────────────────────
function HomePage({ recipes, mealPlan, setPage }) {
  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const todayMeals = mealPlan[todayName] || [];
  const dayNutrition = calcDayNutrition(todayMeals);

  const shopMap = {};
  todayMeals.forEach(({ recipe, servings }) => {
    const ratio = servings / recipe.baseServings;
    recipe.ingredients.forEach(ing => {
      const key = `${ing.name}__${ing.unit}`;
      if (!shopMap[key]) shopMap[key] = { name: ing.name, unit: ing.unit, amount: 0 };
      shopMap[key].amount += ing.amount * ratio;
    });
  });
  const shopList = Object.values(shopMap);

  return (
    <div style={{ padding: "20px 20px 24px", maxWidth: 800, margin: "0 auto" }}>
      <p style={{ margin: "0 0 3px", fontSize: 12, color: T.mid, fontWeight: 600 }}>
        {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
      </p>
      <h2 style={{ margin: "0 0 20px", fontSize: 26, fontWeight: 900, color: T.dark, letterSpacing: "-0.02em" }}>Good day, Chef! 👨‍🍳</h2>

      {/* Today's Nutrition */}
      {todayMeals.length > 0 && (
        <div style={{ background: T.surface, borderRadius: 16, padding: "18px 20px", border: `1px solid ${T.light}`, marginBottom: 16 }}>
          <p style={{ margin: "0 0 14px", fontWeight: 800, fontSize: 15, color: T.dark }}>📊 Today's Nutrition</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
            {[
              { label: "Calories", value: Math.round(dayNutrition.calories), unit: "kcal", color: T.accent },
              { label: "Protein", value: Math.round(dayNutrition.protein), unit: "g", color: T.blue },
              { label: "Carbs", value: Math.round(dayNutrition.carbs), unit: "g", color: "#C8762D" },
              { label: "Fat", value: Math.round(dayNutrition.fat), unit: "g", color: T.purple },
            ].map(m => (
              <div key={m.label} style={{ background: "#FAFAF8", borderRadius: 12, padding: "12px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: m.color }}>{m.value}<span style={{ fontSize: 11 }}>{m.unit}</span></div>
                <div style={{ fontSize: 10, color: T.mid, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.04em" }}>{m.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <MacroBar label="Protein" value={dayNutrition.protein} unit="g" color={T.blue} max={200} />
            <MacroBar label="Carbs" value={dayNutrition.carbs} unit="g" color="#C8762D" max={300} />
            <MacroBar label="Fat" value={dayNutrition.fat} unit="g" color={T.purple} max={100} />
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Today's Meals */}
        <div style={{ background: T.surface, borderRadius: 16, padding: "18px 20px", border: `1px solid ${T.light}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: T.dark }}>🍽 Today's Meals</p>
            <button onClick={() => setPage("planner")} style={{ fontSize: 12, color: T.accent, fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Edit →</button>
          </div>
          {todayMeals.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📅</div>
              <p style={{ margin: "0 0 10px", fontSize: 13, color: T.mid }}>Nothing planned yet.</p>
              <button onClick={() => setPage("planner")} style={{ padding: "7px 16px", background: T.accent, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Plan meals</button>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {todayMeals.map((m, i) => (
                <div key={i} style={{ padding: "10px 12px", background: T.accentBg, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ margin: "0 0 1px", fontWeight: 700, fontSize: 13, color: T.dark }}>{m.recipe.title}</p>
                    <p style={{ margin: 0, fontSize: 11, color: T.mid }}>{m.recipe.nutrition.calories * m.servings} kcal · {m.recipe.nutrition.protein * m.servings}g protein</p>
                  </div>
                  <span style={{ background: T.accent, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20, flexShrink: 0 }}>{m.servings}×</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shopping List */}
        <div style={{ background: T.surface, borderRadius: 16, padding: "18px 20px", border: `1px solid ${T.light}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: T.dark }}>🛒 Shopping List</p>
            <span style={{ fontSize: 12, color: T.mid }}>{shopList.length} items</span>
          </div>
          {shopList.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🛒</div>
              <p style={{ fontSize: 13, color: T.mid, margin: 0 }}>Plan today's meals to see ingredients.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 5, maxHeight: 220, overflowY: "auto" }}>
              {shopList.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 10px", background: i % 2 === 0 ? T.greenBg : T.surface, borderRadius: 8 }}>
                  <span style={{ fontSize: 12, color: T.dark }}>{item.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.green, flexShrink: 0, marginLeft: 8 }}>{fmt(item.amount)} {item.unit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16 }}>
        {[
          { label: "Recipes", value: recipes.length, icon: "📚", page: "cookbook" },
          { label: "Meals this week", value: Object.values(mealPlan).flat().length, icon: "📅", page: "planner" },
          { label: "Today", value: `${todayMeals.length} meal${todayMeals.length !== 1 ? "s" : ""}`, icon: "✅", page: "planner" },
        ].map(s => (
          <div key={s.label} onClick={() => setPage(s.page)}
            style={{ background: T.surface, borderRadius: 14, padding: "14px 16px", border: `1px solid ${T.light}`, cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: T.dark }}>{s.value}</div>
            <div style={{ fontSize: 11, color: T.mid, marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE: COOKBOOK ───────────────────────────────────────────────
function CookbookPage({ recipes, onAddToPlanner }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [proteinFilter, setProteinFilter] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  if (selectedCourse) {
    const filtered = recipes.filter(r =>
      r.course === selectedCourse && (proteinFilter === "All" || r.protein === proteinFilter)
    );
    const proteinsInCourse = ["All", ...new Set(recipes.filter(r => r.course === selectedCourse).map(r => r.protein))];

    return (
      <div style={{ padding: "20px", maxWidth: 860, margin: "0 auto" }}>
        <button onClick={() => { setSelectedCourse(null); setProteinFilter("All"); }}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: T.accent, fontWeight: 700, fontSize: 14, marginBottom: 16, padding: 0 }}>
          ← All Courses
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: T.dark }}>{COURSE_ICONS[selectedCourse]} {selectedCourse}</h2>
          <span style={{ color: T.mid, fontSize: 13 }}>{filtered.length} recipe{filtered.length !== 1 ? "s" : ""}</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
          {proteinsInCourse.map(p => (
            <button key={p} onClick={() => setProteinFilter(p)} style={{
              padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${proteinFilter === p ? T.accent : T.light}`,
              background: proteinFilter === p ? T.accent : T.surface, color: proteinFilter === p ? "#fff" : T.mid,
              fontWeight: 600, fontSize: 12, cursor: "pointer",
            }}>{p}</button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: T.mid }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🍽</div>
            <p>No recipes here yet.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {filtered.map(r => (
              <div key={r.id} onClick={() => setSelectedRecipe(r)}
                style={{ background: T.surface, border: `1px solid ${T.light}`, borderRadius: 14, padding: 18, cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.09)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ background: T.accentBg, color: T.accent, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{r.protein}</span>
                  <span style={{ fontSize: 11, color: T.mid }}>{r.cookTime}</span>
                </div>
                <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: T.dark, lineHeight: 1.3 }}>{r.title}</h3>
                <div style={{ display: "flex", gap: 14 }}>
                  <div><div style={{ fontSize: 18, fontWeight: 800, color: T.accent }}>{r.nutrition.calories}</div><div style={{ fontSize: 10, color: T.mid }}>cal</div></div>
                  <div><div style={{ fontSize: 18, fontWeight: 800, color: T.blue }}>{r.nutrition.protein}g</div><div style={{ fontSize: 10, color: T.mid }}>protein</div></div>
                  <div><div style={{ fontSize: 18, fontWeight: 800, color: T.mid }}>{r.baseServings}</div><div style={{ fontSize: 10, color: T.mid }}>servings</div></div>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} onAddToPlanner={onAddToPlanner} />}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: 860, margin: "0 auto" }}>
      <h2 style={{ margin: "0 0 6px", fontSize: 24, fontWeight: 900, color: T.dark }}>My Cookbook</h2>
      <p style={{ margin: "0 0 20px", color: T.mid, fontSize: 13 }}>{recipes.length} recipes · Select a course to browse</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {COURSES.map(course => {
          const count = recipes.filter(r => r.course === course).length;
          return (
            <div key={course} onClick={() => count > 0 && setSelectedCourse(course)}
              style={{
                background: T.surface, border: `1px solid ${T.light}`, borderRadius: 16, padding: "24px 20px",
                cursor: count > 0 ? "pointer" : "default", opacity: count > 0 ? 1 : 0.4,
                display: "flex", alignItems: "center", gap: 16,
              }}
              onMouseEnter={e => { if (count > 0) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.09)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: 36 }}>{COURSE_ICONS[course]}</div>
              <div>
                <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800, color: T.dark }}>{course}</h3>
                <p style={{ margin: 0, fontSize: 12, color: T.mid }}>{count} recipe{count !== 1 ? "s" : ""}</p>
              </div>
              {count > 0 && <span style={{ marginLeft: "auto", color: T.light, fontSize: 20 }}>›</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PAGE: PLANNER ────────────────────────────────────────────────
function PlannerPage({ recipes, mealPlan, setMealPlan }) {
  const [selectedDay, setSelectedDay] = useState(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerRecipe, setPickerRecipe] = useState(null);
  const [pickerServings, setPickerServings] = useState(2);

  const addMeal = () => {
    if (!pickerRecipe) return;
    setMealPlan(prev => ({ ...prev, [selectedDay]: [...(prev[selectedDay] || []), { recipe: pickerRecipe, servings: pickerServings }] }));
    setShowPicker(false); setPickerRecipe(null); setPickerServings(2);
  };
  const removeMeal = (day, idx) => setMealPlan(prev => ({ ...prev, [day]: prev[day].filter((_, i) => i !== idx) }));

  const dayMeals = mealPlan[selectedDay] || [];
  const dayNutrition = calcDayNutrition(dayMeals);

  const weekMap = {};
  Object.values(mealPlan).flat().forEach(({ recipe, servings }) => {
    const ratio = servings / recipe.baseServings;
    recipe.ingredients.forEach(ing => {
      const key = `${ing.name}__${ing.unit}`;
      if (!weekMap[key]) weekMap[key] = { name: ing.name, unit: ing.unit, amount: 0 };
      weekMap[key].amount += ing.amount * ratio;
    });
  });
  const weekShop = Object.values(weekMap).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div style={{ padding: "20px", maxWidth: 960, margin: "0 auto" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 900, color: T.dark }}>Week Planner</h2>
      <p style={{ margin: "0 0 18px", color: T.mid, fontSize: 13 }}>{Object.values(mealPlan).flat().length} meals planned this week</p>

      {/* Day tabs — scrollable row */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {DAYS.map(d => {
          const count = (mealPlan[d] || []).length;
          const isToday = d === DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
          return (
            <button key={d} onClick={() => setSelectedDay(d)} style={{
              padding: "8px 14px", borderRadius: 12, border: `2px solid ${selectedDay === d ? T.accent : T.light}`,
              background: selectedDay === d ? T.accent : T.surface, color: selectedDay === d ? "#fff" : T.dark,
              fontWeight: 700, fontSize: 12, cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
            }}>
              {d.slice(0, 3)}{isToday ? " ·" : ""}{count > 0 && <span style={{ marginLeft: 4, background: selectedDay === d ? "rgba(255,255,255,0.25)" : T.accentBg, color: selectedDay === d ? "#fff" : T.accent, fontSize: 10, padding: "1px 5px", borderRadius: 10 }}>{count}</span>}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 18 }}>
        {/* Left: day meals + nutrition */}
        <div>
          <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.light}`, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.light}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: T.dark }}>{selectedDay}</h3>
              <button onClick={() => setShowPicker(true)} style={{ padding: "7px 14px", background: T.accent, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>+ Add meal</button>
            </div>
            <div style={{ padding: 16 }}>
              {dayMeals.length === 0 ? (
                <div style={{ textAlign: "center", padding: "24px 0", color: T.mid }}>
                  <p style={{ margin: "0 0 10px", fontSize: 13 }}>No meals for {selectedDay}.</p>
                  <button onClick={() => setShowPicker(true)} style={{ padding: "7px 16px", background: T.accentBg, color: T.accent, border: "none", borderRadius: 10, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Add a meal</button>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {dayMeals.map((m, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: T.accentBg, borderRadius: 12 }}>
                      <div>
                        <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13, color: T.dark }}>{m.recipe.title}</p>
                        <p style={{ margin: 0, fontSize: 11, color: T.mid }}>
                          {m.recipe.nutrition.calories * m.servings} kcal · {m.recipe.nutrition.protein * m.servings}g P · {m.recipe.nutrition.carbs * m.servings}g C · {m.recipe.nutrition.fat * m.servings}g F
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ background: T.accent, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>{m.servings}×</span>
                        <button onClick={() => removeMeal(selectedDay, i)} style={{ background: "none", border: "none", color: T.light, cursor: "pointer", fontSize: 16, padding: 0 }}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Day nutrition */}
          {dayMeals.length > 0 && (
            <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.light}`, padding: "16px 18px" }}>
              <p style={{ margin: "0 0 14px", fontWeight: 800, fontSize: 14, color: T.dark }}>📊 {selectedDay} Nutrition</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
                {[
                  { label: "Calories", value: Math.round(dayNutrition.calories), unit: "kcal", color: T.accent },
                  { label: "Protein", value: Math.round(dayNutrition.protein), unit: "g", color: T.blue },
                  { label: "Carbs", value: Math.round(dayNutrition.carbs), unit: "g", color: "#C8762D" },
                  { label: "Fat", value: Math.round(dayNutrition.fat), unit: "g", color: T.purple },
                ].map(m => (
                  <div key={m.label} style={{ background: "#FAFAF8", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: m.color }}>{m.value}<span style={{ fontSize: 10 }}>{m.unit}</span></div>
                    <div style={{ fontSize: 10, color: T.mid, marginTop: 1 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <MacroBar label="Protein" value={dayNutrition.protein} unit="g" color={T.blue} max={200} />
                <MacroBar label="Carbs" value={dayNutrition.carbs} unit="g" color="#C8762D" max={300} />
                <MacroBar label="Fat" value={dayNutrition.fat} unit="g" color={T.purple} max={100} />
              </div>
            </div>
          )}
        </div>

        {/* Right: weekly shopping list */}
        <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.light}`, overflow: "hidden", alignSelf: "start" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.light}`, background: T.greenBg }}>
            <p style={{ margin: "0 0 2px", fontWeight: 800, fontSize: 14, color: T.dark }}>🛒 Weekly Shopping</p>
            <p style={{ margin: 0, fontSize: 11, color: T.mid }}>{weekShop.length} ingredients total</p>
          </div>
          <div style={{ padding: 14, maxHeight: 440, overflowY: "auto" }}>
            {weekShop.length === 0 ? (
              <div style={{ textAlign: "center", padding: "24px 0", color: T.mid }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🛒</div>
                <p style={{ fontSize: 12 }}>Plan meals to build your list.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 5 }}>
                {weekShop.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 10px", background: i % 2 === 0 ? T.greenBg : T.surface, borderRadius: 8 }}>
                    <span style={{ fontSize: 12, color: T.dark }}>{item.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.green, flexShrink: 0, marginLeft: 6 }}>{fmt(item.amount)} {item.unit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Meal picker modal */}
      {showPicker && (
        <div onClick={() => setShowPicker(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: T.surface, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 600, maxHeight: "80vh", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "14px 24px 12px", borderBottom: `1px solid ${T.light}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: T.dark }}>Add to {selectedDay}</h3>
              <button onClick={() => setShowPicker(false)} style={{ background: T.light, border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: 14 }}>✕</button>
            </div>
            <div style={{ overflowY: "auto", padding: "16px 24px", flex: 1 }}>
              <p style={{ margin: "0 0 10px", fontSize: 11, fontWeight: 700, color: T.mid, textTransform: "uppercase", letterSpacing: "0.06em" }}>Choose a recipe</p>
              <div style={{ display: "grid", gap: 8, marginBottom: 18 }}>
                {recipes.map(r => (
                  <div key={r.id} onClick={() => setPickerRecipe(r)}
                    style={{ padding: "11px 14px", borderRadius: 12, border: `2px solid ${pickerRecipe?.id === r.id ? T.accent : T.light}`, cursor: "pointer", background: pickerRecipe?.id === r.id ? T.accentBg : T.surface }}>
                    <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 13, color: T.dark }}>{r.title}</p>
                    <p style={{ margin: 0, fontSize: 11, color: T.mid }}>{r.course} · {r.protein} · {r.nutrition.calories} cal · {r.nutrition.protein}g protein</p>
                  </div>
                ))}
              </div>
              <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: T.mid, textTransform: "uppercase", letterSpacing: "0.06em" }}>Servings</p>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18 }}>
                {[1, 2, 3, 4].map(n => (
                  <button key={n} onClick={() => setPickerServings(n)} style={{
                    width: 38, height: 38, borderRadius: 10, border: `2px solid ${pickerServings === n ? T.accent : T.light}`,
                    background: pickerServings === n ? T.accent : T.surface, color: pickerServings === n ? "#fff" : T.dark, fontWeight: 700, fontSize: 14, cursor: "pointer",
                  }}>{n}</button>
                ))}
                <input type="number" min="1" max="20" value={pickerServings} onChange={e => setPickerServings(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{ width: 56, height: 38, padding: "0 8px", borderRadius: 10, border: `2px solid ${T.light}`, fontSize: 14, fontWeight: 700, textAlign: "center", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ padding: "14px 24px", borderTop: `1px solid ${T.light}` }}>
              <button onClick={addMeal} disabled={!pickerRecipe} style={{
                width: "100%", padding: "13px", background: pickerRecipe ? T.accent : T.light,
                color: pickerRecipe ? "#fff" : T.mid, border: "none", borderRadius: 12,
                fontWeight: 800, fontSize: 15, cursor: pickerRecipe ? "pointer" : "default",
              }}>
                {pickerRecipe ? `Add "${pickerRecipe.title}"` : "Select a recipe first"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE: ADD RECIPE ─────────────────────────────────────────────
function AddRecipePage({ onSave }) {
  const blank = { title: "", course: "Main Dishes", protein: "Chicken", cookTime: "", calories: "", protein_g: "", carbs: "", fat: "", fiber: "", sodium: "", baseServings: 2, ingredients: [{ amount: "", unit: "", name: "" }], instructions: [""], vocabulary: [{ term: "", def: "" }] };
  const [form, setForm] = useState(blank);
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const updIng = (i, k, v) => setForm(f => { const a = [...f.ingredients]; a[i] = { ...a[i], [k]: v }; return { ...f, ingredients: a }; });
  const updStep = (i, v) => setForm(f => { const a = [...f.instructions]; a[i] = v; return { ...f, instructions: a }; });
  const updVocab = (i, k, v) => setForm(f => { const a = [...f.vocabulary]; a[i] = { ...a[i], [k]: v }; return { ...f, vocabulary: a }; });

  const handleSave = () => {
    if (!form.title.trim()) return alert("Please add a recipe title.");
    if (!form.calories || isNaN(form.calories)) return alert("Please add calories per serving.");
    onSave({
      ...form,
      id: Date.now(),
      baseCalories: parseInt(form.calories),
      baseServings: parseInt(form.baseServings) || 2,
      ingredients: form.ingredients.filter(i => i.name.trim()).map(i => ({ ...i, amount: parseFloat(i.amount) || 0 })),
      instructions: form.instructions.filter(s => s.trim()),
      vocabulary: form.vocabulary.filter(v => v.term.trim()),
      nutrition: {
        calories: parseInt(form.calories) || 0,
        protein: parseFloat(form.protein_g) || 0,
        carbs: parseFloat(form.carbs) || 0,
        fat: parseFloat(form.fat) || 0,
        fiber: parseFloat(form.fiber) || 0,
        sodium: parseFloat(form.sodium) || 0,
      },
    });
    setForm(blank);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inp = { width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${T.light}`, fontSize: 13, outline: "none", boxSizing: "border-box", background: T.surface };
  const lbl = { display: "block", fontSize: 11, fontWeight: 700, color: T.mid, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 };
  const sec = { background: T.surface, borderRadius: 14, padding: "18px 20px", border: `1px solid ${T.light}`, marginBottom: 16 };

  return (
    <div style={{ padding: "20px", maxWidth: 680, margin: "0 auto" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 900, color: T.dark }}>Add a Recipe</h2>
      <p style={{ margin: "0 0 18px", color: T.mid, fontSize: 13 }}>All recipes are saved to My Cookbook.</p>

      {saved && <div style={{ background: T.greenBg, border: `1px solid ${T.green}`, borderRadius: 12, padding: "11px 16px", marginBottom: 16, color: T.green, fontWeight: 700, fontSize: 13 }}>✓ Recipe saved to your cookbook!</div>}

      {/* Basic info */}
      <div style={sec}>
        <p style={{ margin: "0 0 14px", fontWeight: 800, fontSize: 14, color: T.dark }}>Basic Info</p>
        <div style={{ marginBottom: 12 }}>
          <label style={lbl}>Recipe Title *</label>
          <input style={inp} placeholder="e.g. Herb Roasted Salmon" value={form.title} onChange={e => set("title", e.target.value)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><label style={lbl}>Course</label>
            <select style={inp} value={form.course} onChange={e => set("course", e.target.value)}>
              {COURSES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div><label style={lbl}>Protein Type</label>
            <select style={inp} value={form.protein} onChange={e => set("protein", e.target.value)}>
              {PROTEINS.filter(p => p !== "All").map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><label style={lbl}>Cook Time</label><input style={inp} placeholder="e.g. 30 min" value={form.cookTime} onChange={e => set("cookTime", e.target.value)} /></div>
          <div><label style={lbl}>Base Servings</label><input style={inp} type="number" min="1" value={form.baseServings} onChange={e => set("baseServings", e.target.value)} /></div>
        </div>
      </div>

      {/* Nutrition */}
      <div style={sec}>
        <p style={{ margin: "0 0 14px", fontWeight: 800, fontSize: 14, color: T.dark }}>Nutrition (per serving)</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { key: "calories", label: "Calories (kcal) *", placeholder: "320" },
            { key: "protein_g", label: "Protein (g)", placeholder: "25" },
            { key: "carbs", label: "Carbs (g)", placeholder: "40" },
            { key: "fat", label: "Fat (g)", placeholder: "8" },
            { key: "fiber", label: "Fiber (g)", placeholder: "3" },
            { key: "sodium", label: "Sodium (mg)", placeholder: "500" },
          ].map(f => (
            <div key={f.key}><label style={lbl}>{f.label}</label>
              <input style={inp} type="number" placeholder={f.placeholder} value={form[f.key]} onChange={e => set(f.key, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div style={sec}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: T.dark }}>Ingredients</p>
          <button onClick={() => setForm(f => ({ ...f, ingredients: [...f.ingredients, { amount: "", unit: "", name: "" }] }))}
            style={{ padding: "5px 12px", background: T.accentBg, color: T.accent, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>+ Add</button>
        </div>
        {form.ingredients.map((ing, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "72px 72px 1fr 28px", gap: 6, marginBottom: 6, alignItems: "center" }}>
            <input style={inp} placeholder="Amount" value={ing.amount} onChange={e => updIng(i, "amount", e.target.value)} />
            <input style={inp} placeholder="Unit" value={ing.unit} onChange={e => updIng(i, "unit", e.target.value)} />
            <input style={inp} placeholder="Ingredient" value={ing.name} onChange={e => updIng(i, "name", e.target.value)} />
            <button onClick={() => setForm(f => ({ ...f, ingredients: f.ingredients.filter((_, j) => j !== i) }))}
              style={{ background: "none", border: "none", color: T.light, cursor: "pointer", fontSize: 16 }}>✕</button>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div style={sec}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: T.dark }}>Instructions</p>
          <button onClick={() => setForm(f => ({ ...f, instructions: [...f.instructions, ""] }))}
            style={{ padding: "5px 12px", background: T.accentBg, color: T.accent, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>+ Step</button>
        </div>
        {form.instructions.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: T.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
            <textarea style={{ ...inp, resize: "vertical", minHeight: 56, flex: 1 }} placeholder={`Step ${i + 1}…`} value={step} onChange={e => updStep(i, e.target.value)} />
            <button onClick={() => setForm(f => ({ ...f, instructions: f.instructions.filter((_, j) => j !== i) }))}
              style={{ background: "none", border: "none", color: T.light, cursor: "pointer", fontSize: 16, marginTop: 4 }}>✕</button>
          </div>
        ))}
      </div>

      {/* Vocabulary */}
      <div style={sec}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: T.dark }}>📖 Vocabulary <span style={{ fontWeight: 400, fontSize: 12, color: T.mid }}>(optional)</span></p>
          <button onClick={() => setForm(f => ({ ...f, vocabulary: [...f.vocabulary, { term: "", def: "" }] }))}
            style={{ padding: "5px 12px", background: T.accentBg, color: T.accent, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>+ Term</button>
        </div>
        {form.vocabulary.map((v, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 28px", gap: 6, marginBottom: 6, alignItems: "center" }}>
            <input style={inp} placeholder="Term" value={v.term} onChange={e => updVocab(i, "term", e.target.value)} />
            <input style={inp} placeholder="Definition" value={v.def} onChange={e => updVocab(i, "def", e.target.value)} />
            <button onClick={() => setForm(f => ({ ...f, vocabulary: f.vocabulary.filter((_, j) => j !== i) }))}
              style={{ background: "none", border: "none", color: T.light, cursor: "pointer", fontSize: 16 }}>✕</button>
          </div>
        ))}
      </div>

      <button onClick={handleSave} style={{ width: "100%", padding: 15, background: T.accent, color: "#fff", border: "none", borderRadius: 14, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
        Save to My Cookbook
      </button>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────
const PAGE_TITLES = { home: "Chef's Board", cookbook: "My Cookbook", planner: "Week Planner", add: "Add Recipe", settings: "Settings" };

export default function App() {
  const [page, setPage] = useState("home");

  // 1. Initial State Hooks that read from localStorage upon refresh
  const [recipes, setRecipes] = useState<any[]>(() => {
    const saved = localStorage.getItem("kitchen_recipes");
    return saved ? JSON.parse(saved) : INITIAL_RECIPES;
  });

  const [mealPlan, setMealPlan] = useState<any>(() => {
    const saved = localStorage.getItem("kitchen_mealplan");
    return saved ? JSON.parse(saved) : {};
  });

  // 2. Effects that save changes instantly to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("kitchen_recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("kitchen_mealplan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  const addRecipe = useCallback((r: any) => setRecipes(prev => [...prev, r]), []);
  const addToPlanner = useCallback((recipe: any, servings: number) => {
    const day = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
    setMealPlan((prev: any) => ({ ...prev, [day]: [...(prev[day] || []), { recipe, servings }] }));
    setPage("planner");
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{
        background: T.surface, borderBottom: `1px solid ${T.light}`,
        padding: "0 20px", height: T.topH, display: "flex", alignItems: "center",
        position: "sticky", top: 0, zIndex: 100, flexShrink: 0,
      }}>
        <h1 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: T.dark }}>{PAGE_TITLES[page as keyof typeof PAGE_TITLES]}</h1>
      </div>

      {/* Page content — scrollable */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: T.navH + 16 }}>
        {page === "home" && <HomePage recipes={recipes} mealPlan={mealPlan} setPage={setPage} />}
        {page === "cookbook" && <CookbookPage recipes={recipes} onAddToPlanner={addToPlanner} />}
        {page === "planner" && <PlannerPage recipes={recipes} mealPlan={mealPlan} setMealPlan={setMealPlan} />}
        {page === "add" && <AddRecipePage onSave={addRecipe} />}
        {page === "settings" && (
          <div style={{ padding: 24, textAlign: "center", color: T.mid, paddingTop: 60 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⚙️</div>
            <p style={{ fontSize: 16, fontWeight: 600 }}>Settings coming soon.</p>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: T.navH,
        background: T.surface, borderTop: `1px solid ${T.light}`,
        display: "flex", alignItems: "stretch", zIndex: 100,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.07)",
      }}>
        {NAV.map(n => {
          const isHome = n.id === "home";
          const isActive = page === n.id;
          return (
            <button key={n.id} onClick={() => setPage(n.id)} style={{
              flex: isHome ? 1.4 : 1,
              border: "none", background: "transparent", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
              position: "relative",
              borderTop: isActive ? `3px solid ${T.accent}` : "3px solid transparent",
              paddingTop: isHome ? 0 : 0,
            }}>
              {isHome ? (
                <div style={{
                  width: 50, height: 50, borderRadius: "50%",
                  background: isActive ? T.accent : T.dark,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, marginBottom: 0,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                  transform: "translateY(-10px)",
                  border: `3px solid ${T.surface}`,
                }}>
                  {n.icon}
                </div>
              ) : (
                <>
                  <span style={{ fontSize: 20, lineHeight: 1 }}>{n.icon}</span>
                  <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500, color: isActive ? T.accent : T.mid, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {n.label.split(" ")[0]}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </nav>
      </div>
  );
}