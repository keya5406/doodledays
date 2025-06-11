import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../../../shared/schemas/auth.schema"
import * as z from "zod"
import { registerUser } from "@/utils/authApi"
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
import { HoverButton } from "@/components/ui/HoverButton"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const RegisterForm = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      notificationPreferences: {
        emailNotifications: false,
        pushNotifications: false,
      },
    },
  })

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const res = await registerUser(data);
      setSuccess(res.message || "Registered successfully!");
      setError("");
       setTimeout(() => {
       navigate("/login");
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
          <CardTitle className="text-3xl font-bold text-[var(--color-peach)] mb-6 text-center">
            Create Your Account
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 mb-4">
            {/* Username */}
            <div className="grid gap-1.5">
              <Label htmlFor="username" className="font-medium text-[var(--color-ink)]">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter username"
                {...register("username")}
                className="bg-white border border-[var(--color-cloud)] text-[var(--color-ink)] placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--color-peach)] focus:border-[var(--color-peach)] transition"
              />
              {errors.username && (
                <p className="text-sm text-[var(--color-rose)]">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="font-medium text-[var(--color-ink)]">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Enter email"
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
                placeholder="Enter password"
                {...register("password")}
                className="bg-white border border-[var(--color-cloud)] text-[var(--color-ink)] placeholder:text-gray-400 focus:ring-2 focus:ring-[var(--color-peach)] focus:border-[var(--color-peach)] transition"
              />
              {errors.password && (
                <p className="text-sm text-[var(--color-rose)]">{errors.password.message}</p>
              )}
            </div>
            {/* Notification Preferences */}
            <div className="grid gap-3">
              <Label className="font-medium text-[var(--color-ink)]">
                Notification Preferences
              </Label>

              <div className="flex items-center gap-x-3">
                <Controller
                  name="notificationPreferences.emailNotifications"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="emailNotifications"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                      className="w-5 h-5 border-2 rounded transition"
                      style={{
                        borderColor: "var(--color-cloud)",
                        backgroundColor: field.value ? "var(--color-mint)" : "transparent",
                        borderWidth: "2px",
                      }}
                    />
                  )}
                />
                <Label htmlFor="emailNotifications" className="text-[var(--color-ink)] select-none">
                  Email Notifications
                </Label>
              </div>

              <div className="flex items-center gap-x-3">
                <Controller
                  name="notificationPreferences.pushNotifications"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="pushNotifications"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                      className="w-5 h-5 border-2 rounded transition"
                      style={{
                        borderColor: "var(--color-cloud)",
                        backgroundColor: field.value ? "var(--color-mint)" : "transparent",
                        borderWidth: "2px",
                      }}
                    />
                  )}
                />
                <Label htmlFor="pushNotifications" className="text-[var(--color-ink)] select-none">
                  Push Notifications
                </Label>
              </div>
            </div>

            {/* Error & Success Messages */}
            {error && (
              <p className="text-sm text-[var(--color-rose)] font-semibold text-center">{error}</p>
            )}
            {success && (
              <p className="text-sm text-[var(--color-mint)] font-semibold text-center">{success}</p>
            )}
          </CardContent>

          <CardFooter className="pt-0">
            <CardFooter className="pt-0">
              <HoverButton
                type="submit"
                label="Register"
                hoverLabel="Let’s Go 🚀"
                submittingLabel="Registering..."
                isSubmitting={isSubmitting}
                className="w-full font-semibold"
              />
            </CardFooter>



          </CardFooter>
        </form>
      </Card>
    </div>


  )
}

export default RegisterForm