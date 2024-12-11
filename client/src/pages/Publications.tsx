import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";

interface Paper {
  id: number;
  title: string;
  authors: string;
  abstract: string;
  publicationDate: string;
  venue: string;
  pdfUrl: string;
  keywords: string;
  citations: number;
}

export default function Publications() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ["papers", debouncedSearch, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(debouncedSearch && { search: debouncedSearch }),
      });
      
      const response = await fetch(`/api/papers?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch papers");
      }
      return response.json() as Promise<Paper[]>;
    },
  });

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load publications. Please try again later.",
      variant: "destructive",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Academic Publications
      </motion.h1>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, authors, keywords..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : data?.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">No publications found</p>
          </Card>
        ) : (
          <>
            {data?.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold">{paper.title}</h2>
                        <p className="text-muted-foreground">{paper.authors}</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => window.open(paper.pdfUrl, '_blank')}
                      >
                        View Paper
                      </Button>
                    </div>
                    <p className="text-sm">{paper.abstract}</p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <div>{paper.venue}</div>
                      <div>Citations: {paper.citations}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {paper.keywords.split(',').map((keyword, i) => (
                        <span
                          key={i}
                          className="bg-muted px-2 py-1 rounded-md text-xs"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage(p => p + 1)}
                disabled={!data || data.length < 10 || isLoading}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
