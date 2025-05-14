import React from "react";
import Navbar from "../ui/shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w7xl mx-auto ">
        <form action="" className="w-1/2 border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-3">
            <Label className="my-1">Full Name</Label>
            <Input type="text" placeholder="Enter your Name"></Input>
          </div>
          <div className="my-3">
            <Label className="my-1">Email</Label>
            <Input type="email" placeholder="Enter your email"></Input>
          </div>
          <div className="my-3">
            <Label className="my-2">PhoneNumer</Label>
            <Input type="text" placeholder="Enter your Number"></Input>
          </div>
          <div className="my-3">
            <Label className="my-2">Password</Label>
            <Input type="password" placeholder="Enter your Password"></Input>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  classname="cursor-pointer"
                ></Input>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  classname="cursor-pointer"
                ></Input>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
              ></Input>
            </div>
          </div>
          <Button type="submit" className="w-full my-4 ">
            Signup
          </Button>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
