import { NextResponse } from "next/server"
import { sendInquiryEmail } from "@/app/actions/send-inquiry"

type InquiryData = {
  fullName: string
  email: string
  phone: string
  country: string
  packageType: string
  travelMonth: string
  groupSize: string
  duration: string
  message: string
}

const requiredFields: Array<keyof InquiryData> = [
  "fullName",
  "email",
  "country",
  "packageType",
  "travelMonth",
  "groupSize",
  "duration",
]

const getStringValue = (value: FormDataEntryValue | null) => (typeof value === "string" ? value.trim() : "")

export async function POST(request: Request) {
  const formData = await request.formData()

  const data: InquiryData = {
    fullName: getStringValue(formData.get("fullName")),
    email: getStringValue(formData.get("email")),
    phone: getStringValue(formData.get("phone")),
    country: getStringValue(formData.get("country")),
    packageType: getStringValue(formData.get("packageType")),
    travelMonth: getStringValue(formData.get("travelMonth")),
    groupSize: getStringValue(formData.get("groupSize")),
    duration: getStringValue(formData.get("duration")),
    message: getStringValue(formData.get("message")),
  }

  const errorFields = requiredFields.filter((field) => !data[field])

  if (errorFields.length > 0) {
    const params = new URLSearchParams({
      status: "error",
      errorMessage: "Please fill in all required fields.",
      errorFields: errorFields.join(","),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      packageType: data.packageType,
      travelMonth: data.travelMonth,
      groupSize: data.groupSize,
      durationValue: data.duration,
      message: data.message,
    })

    return NextResponse.redirect(new URL(`/inquiry?${params.toString()}`, request.url), 303)
  }

  const result = await sendInquiryEmail(data)

  if (!result.success) {
    const params = new URLSearchParams({
      status: "error",
      errorMessage: result.message || "We were unable to send your inquiry. Please try again.",
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      packageType: data.packageType,
      travelMonth: data.travelMonth,
      groupSize: data.groupSize,
      durationValue: data.duration,
      message: data.message,
    })

    return NextResponse.redirect(new URL(`/inquiry?${params.toString()}`, request.url), 303)
  }

  console.info("[inquiry] Store request stub", { ...data, referenceNumber: result.referenceNumber })

  const successParams = new URLSearchParams({
    ref: result.referenceNumber || "",
    name: data.fullName,
  })

  return NextResponse.redirect(new URL(`/thank-you?${successParams.toString()}`, request.url), 303)
}
