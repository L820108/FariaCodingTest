using System;

using SB.CoreTest;

/// <summary>
/// SchoolsBuddy Technical Test.
///
/// Your task is to find the highest floor of the building from which it is safe
/// to drop a marble without the marble breaking, and to do so using the fewest
/// number of marbles. You can break marbles in the process of finding the answer.
///
/// The method Building.DropMarble should be used to carry out a marble drop. It
/// returns a boolean indicating whether the marble dropped without breaking.
/// Use Building.NumberFloors for the total number of floors in the building.
///
/// A very basic solution has already been implemented but it is up to you to
/// find your own, more efficient solution.
///
/// Please use the function Attempt2 for your answer.
/// </summary>
namespace SB.TechnicalTest
{
    class Program
    {
        /// <summary>
        /// Main entry point.
        /// </summary>
        /// <param name="args"></param>
        static void Main(string[] args)
        {
            Console.WriteLine($"Attempt 1 Highest Safe Floor: {Attempt1()}");
            Console.WriteLine($"Attempt 1 Total Drops: {Building.TotalDrops}");

            Console.WriteLine();
            Building.Reset();

            Console.WriteLine($"Attempt 2 Highest Safe Floor: {Attempt2()}");
            Console.WriteLine($"Attempt 2 Total Drops: {Building.TotalDrops}");
        }

        /// <summary>
        /// First attempt - start at first floor and work up one floor at a time
        /// until you reach a floor at which marble breaks.
        /// The highest safe floor is one below this.
        /// </summary>
        /// <returns>Highest safe floor.</returns>
        static int Attempt1()
        { 
            //an O(N)
            var i = 0;
            while (++i <= Building.NumberFloors && Building.DropMarble(i));

            return i - 1;
        }

        /// <summary>
        /// Second attempt - you do this one! use binary search
        /// </summary>
        /// <returns>Highest safe floor.</returns>
        static int Attempt2()
        {
            // use binary search, O(logN)
            var left = 0;
            var right = Building.NumberFloors;

            while (left <= right)
            {
                var mid = left + (right - left) / 2;
                if (Building.DropMarble(mid) && !Building.DropMarble(mid+1))
                {
                    return mid;
                }
                else if(Building.DropMarble(mid))
                {
                    left = mid + 1;
                }
                else
                {
                    right = mid - 1;
                }
            }

            return 0;
        }

        /// <summary>
        /// Second attempt - you do this one! better than binary search
        /// </summary>
        /// <returns>Highest safe floor.</returns>
        static int Attempt3()
        {
            // use Interpolation search
            int low = 0;
            int high = Building.NumberFloors;
            while(high > low)
            {
                int middle = (high - low) * (target - arr[low]) / (arr[high] - arr[low]) + low;
                if (arr[middle] == target)
                    return middle;
                else if (arr[middle] > target)
                    high = middle - 1;
                else
                    low = middle + 1;
            }

            return 0;
        }

    }
}
