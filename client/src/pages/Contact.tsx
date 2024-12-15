import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SocialLinks from "@/components/SocialLinks";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: FormData) => {
    // Validate the form data
    if (!data.name || !data.email || !data.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Format the email body
    const subject = "Contact Form Submission";
    const body = `
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}`;

    // Open email client with formatted message
    window.location.href = `mailto:taverasholdingsllc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`;
    
    toast({
      title: "Opening email client",
      description: "Your default email application will open to send the message.",
    });
    
    form.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="max-w-2xl mx-auto">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          Get in Touch
        </motion.h1>

        <Card className="p-6 mb-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <Input
                {...form.register("name")}
                placeholder="Your name"
                className={form.formState.errors.name ? "border-red-500" : ""}
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                {...form.register("email")}
                type="email"
                placeholder="your.email@example.com"
                className={form.formState.errors.email ? "border-red-500" : ""}
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea
                {...form.register("message")}
                placeholder="Your message"
                rows={5}
                className={form.formState.errors.message ? "border-red-500" : ""}
              />
              {form.formState.errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
            >
              Send Message
            </Button>
          </form>
        </Card>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Connect on Social Media</h2>
          <SocialLinks />
        </div>
      </div>
    </motion.div>
  );
}
