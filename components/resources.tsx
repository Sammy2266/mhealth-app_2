"use client"

import { useState } from "react"
import { Search, ExternalLink, Play, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedResource, setSelectedResource] = useState(null)
  const [videoPlaying, setVideoPlaying] = useState(null)

  const resources = [
    {
      id: 1,
      title: "Understanding Blood Pressure",
      type: "Article",
      duration: "5 min read",
      description:
        "Learn about the importance of maintaining healthy blood pressure levels and strategies to keep yours in check.",
      tags: ["Heart Health", "Prevention"],
      category: "Articles",
      content: `
        <h2>Understanding Blood Pressure</h2>
        <p>Blood pressure is the force of blood pushing against the walls of your arteries as your heart pumps blood. If this pressure rises and stays high over time, it can damage your heart and lead to health problems such as heart disease and stroke.</p>
        
        <h3>What Do the Numbers Mean?</h3>
        <p>Blood pressure is measured using two numbers:</p>
        <ul>
          <li><strong>Systolic pressure</strong> (the top number) - The pressure when your heart beats and pushes blood through your arteries.</li>
          <li><strong>Diastolic pressure</strong> (the bottom number) - The pressure when your heart rests between beats.</li>
        </ul>
        
        <h3>Blood Pressure Categories</h3>
        <ul>
          <li><strong>Normal:</strong> Less than 120/80 mm Hg</li>
          <li><strong>Elevated:</strong> 120-129/less than 80 mm Hg</li>
          <li><strong>High Blood Pressure (Hypertension) Stage 1:</strong> 130-139/80-89 mm Hg</li>
          <li><strong>High Blood Pressure (Hypertension) Stage 2:</strong> 140 or higher/90 or higher mm Hg</li>
          <li><strong>Hypertensive Crisis:</strong> Higher than 180/higher than 120 mm Hg</li>
        </ul>
        
        <h3>Tips for Maintaining Healthy Blood Pressure</h3>
        <ol>
          <li>Eat a healthy diet low in salt, saturated fat, and alcohol</li>
          <li>Maintain a healthy weight</li>
          <li>Exercise regularly (at least 30 minutes most days)</li>
          <li>Quit smoking</li>
          <li>Manage stress</li>
          <li>Take medications as prescribed</li>
          <li>Monitor your blood pressure regularly</li>
        </ol>
        
        <p>Remember, high blood pressure often has no symptoms, so regular check-ups are essential for early detection and management.</p>
      `,
    },
    {
      id: 2,
      title: "10-Minute Meditation for Stress",
      type: "Video",
      duration: "10 min",
      description: "A guided meditation session to help reduce stress and improve mental wellbeing.",
      tags: ["Mental Health", "Meditation"],
      category: "Videos",
      videoId: "O-6f5wQXSu8", // YouTube video ID
      thumbnail: "https://img.youtube.com/vi/O-6f5wQXSu8/hqdefault.jpg",
    },
    {
      id: 3,
      title: "Heart-Healthy Mediterranean Salad",
      type: "Recipe",
      duration: "15 min prep",
      description: "A delicious and nutritious salad packed with ingredients that support cardiovascular health.",
      tags: ["Nutrition", "Heart Health"],
      category: "Recipes",
      content: `
        <h2>Heart-Healthy Mediterranean Salad</h2>
        
        <h3>Ingredients</h3>
        <ul>
          <li>2 cups mixed greens (spinach, arugula, lettuce)</li>
          <li>1 cucumber, diced</li>
          <li>1 bell pepper, diced</li>
          <li>1 cup cherry tomatoes, halved</li>
          <li>1/4 red onion, thinly sliced</li>
          <li>1/2 cup Kalamata olives</li>
          <li>1/2 cup feta cheese, crumbled</li>
          <li>1/4 cup walnuts, chopped</li>
        </ul>
        
        <h3>For the Dressing</h3>
        <ul>
          <li>3 tablespoons extra virgin olive oil</li>
          <li>1 tablespoon lemon juice</li>
          <li>1 clove garlic, minced</li>
          <li>1 teaspoon dried oregano</li>
          <li>Salt and pepper to taste</li>
        </ul>
        
        <h3>Instructions</h3>
        <ol>
          <li>In a large bowl, combine all salad ingredients.</li>
          <li>In a small bowl, whisk together all dressing ingredients.</li>
          <li>Pour the dressing over the salad and toss gently to combine.</li>
          <li>Serve immediately or refrigerate for up to 1 hour before serving.</li>
        </ol>
        
        <h3>Nutritional Benefits</h3>
        <p>This Mediterranean salad is rich in heart-healthy fats from olive oil, olives, and walnuts. It's also packed with antioxidants, fiber, and vitamins from the fresh vegetables. The feta cheese provides calcium and protein, while being lower in fat than many other cheeses.</p>
        
        <p>Enjoy this salad as a side dish or add grilled chicken or chickpeas for a complete meal!</p>
      `,
    },
    {
      id: 4,
      title: "Low-Impact Cardio Workout",
      type: "Video",
      duration: "20 min",
      description: "A gentle cardio workout suitable for all fitness levels that's easy on your joints.",
      tags: ["Fitness", "Heart Health"],
      category: "Exercises",
      videoId: "7HuGhMp18-c", // YouTube video ID
      thumbnail: "https://img.youtube.com/vi/7HuGhMp18-c/hqdefault.jpg",
    },
    {
      id: 5,
      title: "Managing Diabetes Through Diet",
      type: "Article",
      duration: "8 min read",
      description: "Practical tips for controlling blood sugar levels through dietary choices.",
      tags: ["Nutrition", "Diabetes"],
      category: "Articles",
      content: `
        <h2>Managing Diabetes Through Diet</h2>
        
        <p>Diet plays a crucial role in managing diabetes. The foods you eat directly affect your blood sugar levels, so making informed dietary choices is essential for keeping your diabetes under control.</p>
        
        <h3>Key Dietary Principles for Diabetes Management</h3>
        
        <h4>1. Focus on Carbohydrate Consistency</h4>
        <p>Carbohydrates have the greatest impact on blood sugar levels. Aim to eat consistent amounts of carbohydrates at each meal to help maintain steady blood sugar levels. Learn to count carbs and understand portion sizes.</p>
        
        <h4>2. Choose Complex Carbohydrates</h4>
        <p>Not all carbs are created equal. Choose complex carbohydrates that are high in fiber, such as:</p>
        <ul>
          <li>Whole grains (brown rice, whole wheat bread, oats)</li>
          <li>Legumes (beans, lentils, chickpeas)</li>
          <li>Non-starchy vegetables (broccoli, spinach, peppers)</li>
          <li>Fruits with edible skins</li>
        </ul>
        
        <h4>3. Include Lean Protein</h4>
        <p>Protein helps you feel full and doesn't raise blood sugar levels. Good sources include:</p>
        <ul>
          <li>Poultry without skin</li>
          <li>Fish and seafood</li>
          <li>Eggs</li>
          <li>Tofu and tempeh</li>
          <li>Low-fat dairy</li>
        </ul>
        
        <h4>4. Choose Healthy Fats</h4>
        <p>Healthy fats don't directly affect blood sugar levels but are important for overall health:</p>
        <ul>
          <li>Avocados</li>
          <li>Nuts and seeds</li>
          <li>Olive oil</li>
          <li>Fatty fish (salmon, mackerel, sardines)</li>
        </ul>
        
        <h4>5. Limit Added Sugars and Refined Carbs</h4>
        <p>These can cause rapid spikes in blood sugar:</p>
        <ul>
          <li>Sodas and sweetened beverages</li>
          <li>Candy and desserts</li>
          <li>White bread, rice, and pasta</li>
          <li>Processed snack foods</li>
        </ul>
        
        <h4>6. Practice Portion Control</h4>
        <p>Even healthy foods can raise blood sugar if you eat too much. Use measuring cups or a food scale until you become familiar with appropriate portion sizes.</p>
        
        <h3>Sample Meal Plan</h3>
        <p><strong>Breakfast:</strong> 1/2 cup oatmeal with cinnamon, 1 tablespoon chopped nuts, and 1/2 cup berries</p>
        <p><strong>Lunch:</strong> Salad with 3 oz grilled chicken, plenty of non-starchy vegetables, 1/4 avocado, and vinaigrette dressing</p>
        <p><strong>Dinner:</strong> 3 oz baked fish, 1/2 cup brown rice, 1 cup roasted vegetables</p>
        <p><strong>Snacks:</strong> Small apple with 1 tablespoon almond butter; 1/4 cup hummus with vegetable sticks</p>
        
        <p>Remember to work with your healthcare provider or a registered dietitian to create a meal plan that's tailored to your specific needs.</p>
      `,
    },
    {
      id: 6,
      title: "Yoga for Better Sleep",
      type: "Video",
      duration: "15 min",
      description: "Gentle yoga poses to help you relax and prepare for a restful night's sleep.",
      tags: ["Mental Health", "Fitness"],
      category: "Videos",
      videoId: "v7SN-d4qXx0", // YouTube video ID
      thumbnail: "https://img.youtube.com/vi/v7SN-d4qXx0/hqdefault.jpg",
    },
  ]

  const filters = ["All", "Articles", "Videos", "Recipes", "Exercises"]

  // Filter resources based on search query and active filter
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = activeFilter === "All" || resource.category === activeFilter

    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Health Resources</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search resources..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto py-2">
        {filters.map((filter) => (
          <Badge
            key={filter}
            variant={activeFilter === filter ? "secondary" : "outline"}
            className="rounded-full cursor-pointer"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{resource.title}</CardTitle>
                <CardDescription>
                  {resource.type} • {resource.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                <div className="flex gap-2 mt-3">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                {resource.type === "Video" && (
                  <div className="w-full">
                    <div
                      className="relative w-full h-40 mt-2 rounded-md overflow-hidden cursor-pointer group"
                      onClick={() => setVideoPlaying(resource)}
                    >
                      <img
                        src={resource.thumbnail || "/placeholder.svg"}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                )}
                {(resource.type === "Article" || resource.type === "Recipe") && (
                  <Button variant="outline" className="mt-2 w-full" onClick={() => setSelectedResource(resource)}>
                    Read {resource.type} <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No resources found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Article/Recipe Dialog */}
      <Dialog open={selectedResource !== null} onOpenChange={(open) => !open && setSelectedResource(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedResource?.title}</DialogTitle>
            <DialogDescription>
              {selectedResource?.type} • {selectedResource?.duration}
            </DialogDescription>
          </DialogHeader>
          <div
            className="mt-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: selectedResource?.content }}
          />
          <div className="flex justify-end mt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={videoPlaying !== null} onOpenChange={(open) => !open && setVideoPlaying(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>{videoPlaying?.title}</DialogTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setVideoPlaying(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>{videoPlaying?.description}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full mt-4">
            {videoPlaying && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoPlaying.videoId}?autoplay=1`}
                title={videoPlaying.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

