import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../../shared/schemas/auth.schema"
import * as z from "zod"
import { loginUser } from "@/utils/authApi"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HoverButton } from "@/components/ui/HoverButton";
import { Label } from "@/components/ui/label"
import { subscribeUserToPush } from "@/utils/pushSubscription";


const LoginForm = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await loginUser(data);
      setSuccess("Login successful!");
      setError("");
      
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.user.id.toString());
      await subscribeUserToPush(res.user.id, res.token);

      setTimeout(() => {
        navigate("/entry");
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-r from-pink-100 via-white to-white px-4">
      <Card className="w-full max-w-md border border-[var(--color-cloud)] bg-[var(--color-sand)] text-[var(--color-ink)] shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold text-[var(--color-peach)]">
            Login to Your Account
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 mb-4">
            {/* Email */}
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="font-medium text-[var(--color-ink)]">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter your email"
                {...register("email")}
                className="bg-white border border-[var(--color-cloud)] text-[var(--color-ink)] placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--color-peach)] focus:border-[var(--color-peach)] transition"
              />
              {errors.email && (
                <p className="text-sm text-[var(--color-rose)]">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-1.5">
              <Label htmlFor="password" className="font-medium text-[var(--color-ink)]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="bg-white border border-[var(--color-cloud)] text-[var(--color-ink)] placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--color-peach)] focus:border-[var(--color-peach)] transition"
              />
              {errors.password && (
                <p className="text-sm text-[var(--color-rose)]">{errors.password.message}</p>
              )}
            </div>

            {/* Error/Success */}
            {error && (
              <p className="text-sm text-[var(--color-rose)] font-semibold text-center">{error}</p>
            )}
            {success && (
              <p className="text-sm text-[var(--color-mint)] font-semibold text-center">{success}</p>
            )}
          </CardContent>

          <CardFooter>
            <HoverButton
              label="Submit"
              hoverLabel="Ready to submit"
              isSubmitting={isSubmitting}
              type="submit"
            />

          </CardFooter>
        </form>
      </Card>
    </div >
  )
}

export default LoginForm
